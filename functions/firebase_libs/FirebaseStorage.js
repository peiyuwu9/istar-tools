import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

export async function uploadExcel(excelBuffer, filename) {
  const storage = getStorage();
  const storageRef = ref(storage, filename);
  const metadata = {
    contentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  const blob = new Blob([excelBuffer]);

  await uploadBytes(storageRef, blob, metadata);

  // exmaple: https://firebasestorage.googleapis.com/v0/b/istar-tools.appspot.com/o/TARGET_TEST_CP_20240309133352.xlsx?alt=media&token=56743509-a00f-4d59-8715-39b7f9a6bfc1
  return await getDownloadURL(storageRef);
}

export async function deleteFile(filename) {
  const storage = getStorage();
  const storageRef = ref(storage, filename);
  return await deleteObject(storageRef);
}
