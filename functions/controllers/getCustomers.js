import { orderBy } from "firebase/firestore";
import { getList } from "../firebase_libs/Firestore.js";

export default async function (req, res) {
  const orderByCol = req.query.orderBy;
  const query = [orderBy(orderByCol)];
  let data = [];
  try {
    data = await getList("customers", query);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error!" });
  }

  return res.status(200).send(data);
}
