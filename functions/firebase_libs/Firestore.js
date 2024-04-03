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
  const data = res.docs.map((doc) => {
    let temp = doc.data();
    return { id: doc.id, ...temp };
  });
  return data;
}

export async function addNewDoc(collec, data) {
  const db = getFirestore();
  const ref = doc(collection(db, collec));
  data = { ...data, created_at: serverTimestamp() };
  return await setDoc(ref, data);
}
