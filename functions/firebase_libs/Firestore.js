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

  const currentCount = pageNum !== 1 ? (pageNum - 1) * limitNum : limitNum;
  const q = query(
    collection(db, collec),
    orderBy(orderByCol),
    limit(currentCount)
  );
  const res = await getDocs(q);

  // page 1 doesn't need calculation
  if (pageNum === 1) {
    return res.docs.map((doc) => doc.data());
  } else {
    // get last document orders
    const lastDoc = res.docs[res.docs.length - 1];

    // get required documents
    const nextQ = query(
      collection(db, collec),
      orderBy(orderByCol),
      startAfter(lastDoc.data()[orderByCol]),
      limit(limitNum)
    );
    const nextRes = await getDocs(nextQ);
    return nextRes.docs.map((doc) => doc.data());
  }
}

export async function addNewDoc(collec, data) {
  const db = getFirestore();
  const ref = doc(collection(db, collec));
  data = { ...data, timestamp: serverTimestamp() };
  return await setDoc(ref, data);
}
