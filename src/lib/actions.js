import { routeConstants } from "@/constants";

// const apiUrl = "https://app-btl5xbh5qq-uk.a.run.app/api";
const apiUrl = "http://127.0.0.1:5001/istar-tools/us-east4/app/api";

export async function getCustomerProposals(orderByCol, pageNum, limitNum) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customer-proposals"].path}?orderByCol=${orderByCol}&pageNum=${pageNum}&limitNum=${limitNum}`
  );
  return await res.json();
}

export async function getCsutomers(orderByCol, pageNum, limitNum) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customers"].path}?orderByCol=${orderByCol}&pageNum=${pageNum}&limitNum=${limitNum}`
  );
  return await res.json();
}
