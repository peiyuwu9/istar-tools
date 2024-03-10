import {
  formatStylesQuery,
  isLoggedinAcumatica,
  loginAcumatica,
} from "../utils/utils.js";
import {
  createExcel,
  formatDataForExcel,
  formatImagesPath,
  generateFileName,
  getImage,
  getStockItemData,
} from "../utils/cpUtils.js";

import { uploadExcel } from "../firebase_libs/FirebaseStorage.js";
import { addNewDoc } from "../firebase_libs/Firestore.js";

export default async function (req, res) {
  const { customer, program, styles } = req.body;
  if (!styles) return res.status(400).send("Missing Styles Numbers");

  const query = formatStylesQuery(styles);
  let data = [];

  try {
    // check if seesion expired
    if (isLoggedinAcumatica(global.AcumaticaSession)) await loginAcumatica();

    // retrieve stock item data
    data = await getStockItemData(global.AcumaticaSession.Cookie, query);
  } catch (err) {
    // in case session is expired
    if (err === "Login required") {
      await loginAcumatica();
      data = await getStockItemData(global.AcumaticaSession.Cookie, query);
    }
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }

  try {
    // prepare date for excel
    const excelData = formatDataForExcel(data);

    // retrieve stock item images
    const imageURLs = formatImagesPath(data);
    const imageBuffers = await Promise.all(
      imageURLs.map((url) => getImage(global.AcumaticaSession.Cookie, url))
    );

    // upload excel file
    const excelBuffer = await createExcel(excelData, imageBuffers);
    const cpFileName = generateFileName(customer, program);
    const downloadUrl = await uploadExcel(excelBuffer, cpFileName);

    // add cp data to database
    const doc = {
      title: cpFileName,
      url: downloadUrl,
    };
    await addNewDoc("cps", doc);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }

  return res.status(200).send("CP Creation Successful");
}
