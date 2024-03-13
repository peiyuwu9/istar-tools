import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export async function getList(collec, year) {
  const db = getFirestore();
  const firstDateofCurrentYear = new Date(year, 0, 1);
  const firstDateOfNextYear = new Date(year + 1, 0, 1);

  const q = query(
    collection(db, collec),
    orderBy("created_at", "desc"),
    where("created_at", ">=", firstDateofCurrentYear),
    where("created_at", "<", firstDateOfNextYear)
  );
  const res = await getDocs(q);

  return res.docs.map((doc) => doc.data());
}

export async function addNewDoc(collec, data) {
  const db = getFirestore();
  const ref = doc(collection(db, collec));
  data = { ...data, created_at: serverTimestamp() };
  return await setDoc(ref, data);
}
