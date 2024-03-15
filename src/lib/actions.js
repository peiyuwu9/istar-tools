import { routeConstants } from "@/constants";

const apiUrl = "https://app-btl5xbh5qq-uk.a.run.app/api";
// const apiUrl = "http://127.0.0.1:5001/istar-tools/us-east4/app/api";

export async function getCustomerProposals(year) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customer-proposals"].path.get}?year=${year}`
  );
  return await res.json();
}

export async function createCustomerProposal(data) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customer-proposal"].path.post}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return await res.json();
}

export async function getCsutomers(orderByCol, pageNum, limitNum) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customers"].path.get}?orderByCol=${orderByCol}&pageNum=${pageNum}&limitNum=${limitNum}`
  );
  return await res.json();
}
