import { routeConstants } from "@/constants";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getCustomerProposals(year) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customer-proposals"].path.get}?year=${year}`
  );
  if (!res.ok) throw new Error("Oops! Something Went Wrong!");
  return await res.json();
}

export async function createCustomerProposal(data) {
  console.log(data);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  const res = await fetch(`${apiUrl}/customer-proposa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Oops! Something Went Wrong!");
  return await res.json();
}

export async function getCustomers() {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customers"].path.get}?orderBy=name`
  );
  if (!res.ok) throw new Error("Oops! Something Went Wrong!");
  return await res.json();
}
