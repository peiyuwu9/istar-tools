import Bottleneck from "bottleneck";

import {
  formatStylesQuery,
  isAcumaticaExpired,
  loginAcumatica,
} from "../utils/utils.js";
import {
  createExcel,
  formatDataForExcel,
  formatImagesPath,
  generateFilename,
  getImage,
  getStockItemData,
} from "../utils/cpUtils.js";

import { uploadExcel } from "../firebase_libs/FirebaseStorage.js";
import { addNewDoc } from "../firebase_libs/Firestore.js";

export default async function (req, res) {
  const { customer, program, styles, markets } = req.body;
  if (!styles)
    return res.status(400).send({ message: "Missing Styles Numbers!" });

  const query = formatStylesQuery(styles);
  let data = [];

  try {
    // check if seesion expired
    if (isAcumaticaExpired(global.AcumaticaSession)) await loginAcumatica();

    // retrieve stock item data
    data = await getStockItemData(global.AcumaticaSession.Cookie, query);
  } catch (err) {
    // in case session is expired
    if (err === "Login required") {
      await loginAcumatica();
      data = await getStockItemData(global.AcumaticaSession.Cookie, query);
    }
    return res.status(500).send({ message: "Internal Server Error!" });
  }

  if (data.length === 0)
    return res.status(200).send({ message: "No Inventory ID Found!" });

  try {
    // prepare date for excel
    const excelData = formatDataForExcel(data, markets);

    // retrieve stock item images
    const imageURLs = formatImagesPath(data);
    // Bottleneck is a task scheduler and rate limiter for Node.js
    const limiter = new Bottleneck({
      maxConcurrent: 10, // how many jobs can be executing at the same time
      minTime: 100, // how long to wait after launching a job before launching another one
    });
    const allImageTasks = imageURLs.map((url) => {
      // schedule returns a promise that resolves when the operation is complete
      return limiter.schedule(() => {
        // this method is called when the scheduler is ready for it
        return getImage(global.AcumaticaSession.Cookie, url);
      });
    });
    const imageBuffers = await Promise.all(allImageTasks);

    // upload excel file
    const excelBuffer = await createExcel(excelData, imageBuffers);
    const filename = generateFilename(customer, program);
    const downloadUrl = await uploadExcel(excelBuffer, filename);

    // add cp data to database
    const doc = {
      program,
      customer,
      filename,
      url: downloadUrl,
    };
    await addNewDoc("customer_proposals", doc);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error!" });
  }

  // check inventory ids that are not in databaase
  const existingInventoryIds = data.map(
    (style) => style?.InventoryID?.value || ""
  );
  const userInputStyles = styles.split(",");
  const notExistingInventoryIds = userInputStyles.reduce((array, style) => {
    if (style) {
      const formattedStyle = style.replaceAll(" ", "");
      if (!existingInventoryIds.includes(formattedStyle)) array.push(style);
    }
    return array;
  }, []);
  const message =
    notExistingInventoryIds.length === 0
      ? ""
      : notExistingInventoryIds.length === 1
      ? `Below style is not found:\n${notExistingInventoryIds[0]}`
      : `Below styles are not found:\n${notExistingInventoryIds.join("\n")}`;

  return res.status(200).send({ message });
}
