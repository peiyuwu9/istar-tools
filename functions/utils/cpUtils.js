import Excel from "exceljs";
import { generateTimeStamp, resizeAndCompressImage } from "../utils/utils.js";
import { columnType } from "./cpDataValidation.js";

export async function getStockItemData(Cookie, query) {
  const res = await fetch(
    `${process.env.ACUMATICA_URL}/${process.env.GET_STOCK_ITEM_DATA_PATH}&$filter=${query}`,
    {
      headers: {
        Cookie,
      },
    }
  );

  if (!res.ok && res.status === 401) throw "Login required";

  if (!res.ok || res.status !== 200)
    throw "Error occurs when retrieving stock item data";

  return await res.json();
}

export function formatDataForExcel(data) {
  const titles = Object.keys(columnType);
  const hearder = titles.map((title) => title.split("_").join(" "));
  const excelData = [hearder];

  // prepare row data
  data.forEach((style) => {
    const temp = [];
    titles.forEach((title) => {
      // ?? only checks null and undefined
      let value = style.JewelryDetails[title]?.value ?? "";

      if (columnType[title] === "percentage" && !isNaN(value))
        value = value / 100;

      temp.push(value);
    });
    excelData.push(temp);
  });

  // prepare header styles
  const columnStyle = titles.map((title) => {
    const col = {
      style: {},
    };

    switch (columnType[title]) {
      case "text":
        break;
      case "weight":
        col.style["numFmt"] = "0.0g";
        break;
      case "dollar":
        col.style["numFmt"] = "$#,##0.0000";
        break;
      case "percentage":
        col.style["numFmt"] = "0.0%";
        break;
    }

    return col;
  });
  excelData.push(columnStyle);

  return excelData;
}

export function formatImagesPath(data) {
  // exmaple: ["AcumaticaERP/entity/CustomerProposal/v1/files/b9d7ee76-3960-4797-ab96-73da8379316b"]
  return data.map((style) => style.files[0]?.href.substr(1) || "");
}

export async function getImage(Cookie, path) {
  if (!path) return "";

  const res = await fetch(`${process.env.ACUMATICA_URL}/${path}`, {
    headers: {
      Cookie,
    },
  });

  if (!res.ok || res.status !== 200) throw "Error occurs when retrieving image";

  const imageBlob = await res.blob();
  const imageArrayBuffer = await imageBlob.arrayBuffer();
  const imageRawBuffer = Buffer.from(imageArrayBuffer);

  return resizeAndCompressImage(imageRawBuffer);
}

export async function createExcel(data, imageBurffers) {
  const workbook = new Excel.Workbook();

  // create worksheet
  const worksheet = workbook.addWorksheet("CP", {
    headerFooter: { firstHeader: "iStar" },
  });

  // apply styles to worksheet
  worksheet.columns = data.pop();

  // load data into worksheet
  worksheet.addRows(data);

  // resize column width
  worksheet.columns.forEach((column) => {
    // times 7 equal 200 pixel width in excel
    if (column.values[1] === "Imgae") return (column.width = 29);

    let maxLength = 10;
    column.eachCell((cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
        column.width = maxLength;
      }
    });
  });

  // resize row height for image; times 1.33 equal 200 pixel height in excel
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) row.height = 150;
  });

  imageBurffers.forEach((image, index) => {
    if (!image) return;

    // add image to worksheet
    const imageId = workbook.addImage({ buffer: image, extension: "png" });

    // define image position and size
    worksheet.addImage(imageId, {
      // column starts at 0; row starts at 1
      tl: { col: 0, row: index + 1 },
      ext: { width: 200, height: 200 },
    });
  });

  return await workbook.xlsx.writeBuffer();
}

export function generateFileName(customer, program) {
  let fileName = "";
  if (customer) fileName += customer.toUpperCase();
  if (program) {
    if (customer) {
      fileName += "_" + program.toUpperCase();
    } else {
      fileName += program.toUpperCase();
    }
  }
  if (!customer && !program) {
    fileName += "CP";
  } else {
    fileName += "_CP";
  }
  const timestamnp = generateTimeStamp();
  fileName += "_" + timestamnp;
  fileName += ".xlsx";

  // exmpale: TARGET_TEST_CP_20240309131532.xlsx
  return fileName;
}
