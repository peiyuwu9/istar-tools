import { getList } from "../firebase_libs/Firestore.js";
import { isPositiveInteger } from "../utils/utils.js";

export default async function (req, res) {
  const year = parseFloat(req.query.year);
  const currentYear = new Date().getFullYear();

  if (!isPositiveInteger(year) || year < 2000 || year > currentYear)
    return res.status(400).send({ message: "Invalid Year" });

  if (year < 2010)
    return res
      .status(400)
      .send({ message: "Cannot Query Data Before Year 2010" });

  let data = [];

  try {
    data = await getList("customer_proposals", year);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }

  return res.status(200).send(data);
}
