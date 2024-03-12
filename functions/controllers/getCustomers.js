import { getList } from "../firebase_libs/Firestore.js";
import { isPositiveInteger } from "../utils/utils.js";

export default async function (req, res) {
  const orderByCol = req.query.orderByCol || "program";
  const pageNum = parseFloat(req.query.pageNum);
  const limitNum = parseFloat(req.query.limitNum);

  if (!isPositiveInteger(pageNum) || !isPositiveInteger(limitNum))
    return res.status(400).send("Invalid Query Format");

  let data = [];

  try {
    data = await getList("customers", orderByCol, pageNum, limitNum);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }

  return res.status(200).send(data);
}
