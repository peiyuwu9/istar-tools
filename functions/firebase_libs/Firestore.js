import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export async function getList(collec, orderByCol, pageNum, limitNum) {
  const db = getFirestore();
  let data = [];

  // special case
  if (pageNum === 1 && limitNum === 1) {
    const q = query(collection(db, collec), orderBy(orderByCol), limit(1));
    const res = await getDocs(q);
    data = res.docs.map((doc) => doc.data());
  } else {
    // get last document orders
    const q1 = query(
      collection(db, collec),
      orderBy(orderByCol),
      limit((pageNum - 1) * limitNum)
    );
    const res1 = await getDocs(q1);
    const lastDoc = res1.docs[res1.docs.length - 1];

    // get required documents
    const q2 = query(
      collection(db, collec),
      orderBy(orderByCol),
      startAfter(lastDoc.data()[orderByCol]),
      limit(limitNum)
    );
    const res2 = await getDocs(q2);
    data = res2.docs.map((doc) => doc.data());
  }

  return data;
}

export async function addNewDoc(collec, data) {
  const db = getFirestore();
  const ref = doc(collection(db, collec));
  data = { ...data, timestamp: serverTimestamp() };
  return await setDoc(ref, data);
}
