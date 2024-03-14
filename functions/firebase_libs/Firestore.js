import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  query,
} from "firebase/firestore";

export async function getList(collec, querys = []) {
  const db = getFirestore();
  const res = await getDocs(query(collection(db, collec), ...querys));
  return res.docs.map((doc) => doc.data());
}

export async function addNewDoc(collec, data) {
  const db = getFirestore();
  const ref = doc(collection(db, collec));
  data = { ...data, created_at: serverTimestamp() };
  return await setDoc(ref, data);
}
