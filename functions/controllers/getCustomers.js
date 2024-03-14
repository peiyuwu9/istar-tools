import { getList } from "../firebase_libs/Firestore.js";
import { isPositiveInteger } from "../utils/utils.js";

export default async function (req, res) {
  let data = [];
  try {
    data = await getList("customers");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }

  return res.status(200).send(data);
}
