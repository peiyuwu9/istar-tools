// const apiUrl = "https://app-btl5xbh5qq-uk.a.run.app/api";
const apiUrl = "http://127.0.0.1:5001/istar-tools/us-east4/app/api";

export async function getCPList(orderByCol, pageNum, limitNum) {
  const res = await fetch(
    `${apiUrl}/cps?orderByCol=${orderByCol}&pageNum=${pageNum}&limitNum=${limitNum}`
  );
  const data = await res.json();
  return { data };
}
