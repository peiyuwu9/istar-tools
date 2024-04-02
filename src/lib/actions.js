import { routeConstants } from "@/constants";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getCustomerProposals(year) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customer-proposals"].method.get}?year=${year}`
  );
  if (!res.ok) throw new Error("Oops! Something Went Wrong!");
  return await res.json();
}

export async function createCustomerProposal(data) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customer-proposal"].method.post}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("Oops! Something Went Wrong!");
  return await res.json();
}

export async function getCustomers() {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customers"].method.get}?orderBy=name`
  );
  if (!res.ok) throw new Error("Oops! Something Went Wrong!");
  return await res.json();
}
