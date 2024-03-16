import { routeConstants } from "@/constants";

const apiUrl = import.meta.env.VITE_API_URL;

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
