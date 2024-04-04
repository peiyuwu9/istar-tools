import { deleteExistingDoc } from "../firebase_libs/Firestore.js";
import { deleteFile } from "../firebase_libs/FirebaseStorage.js";

export default async function (req, res) {
  const id = req.query.id;
  const filename = req.query.filename;

  if (!id) res.status(400).send({ message: "Invalid ID!" });
  if (!filename) res.status(400).send({ message: "Invalid File Name!" });

  try {
    await Promise.all([
      deleteExistingDoc("customer_proposals", id),
      deleteFile(filename),
    ]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error!" });
  }

  return res.status(200).send({ message: "Customer Proposal Deleted!" });
}
