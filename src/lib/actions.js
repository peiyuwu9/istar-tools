import { routeConstants } from "@/constants";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getCustomerProposals(year) {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customer-proposals"].method.get}?year=${year}`
  );
  const resJson = await res.json();
  if (!res.ok) throw new Error(resJson.message);
  return resJson;
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
  const resJson = await res.json();
  if (!res.ok) throw new Error(resJson.message);
  return resJson;
}

export async function getCustomers() {
  const res = await fetch(
    `${apiUrl}/${routeConstants["customers"].method.get}?orderBy=name`
  );
  const resJson = await res.json();
  if (!res.ok) throw new Error(resJson.message);
  return resJson;
}

export async function deleteCustomerProposal(id, filename) {
  const url = encodeURI(
    `${apiUrl}/${routeConstants["customer-proposal"].method.delete
      .replace("{{id}}", id)
      .replace("{{filename}}", filename)}`
  );
  const res = await fetch(url, {
    method: "DELETE",
  });
  const resJson = await res.json();
  if (!res.ok) throw new Error(resJson.message);
  return resJson;
}
