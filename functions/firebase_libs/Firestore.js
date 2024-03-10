import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export async function addNewDoc(collec, data) {
  const db = getFirestore();
  const ref = doc(collection(db, collec));
  data = { ...data, timestamp: serverTimestamp() };
  return await setDoc(ref, data);
}

export async function getList(collec) {
  const db = getFirestore();
  const res = await getDocs(collection(db, collec));
  const data = res.docs.map((doc) => doc.data());
  return data;
}
