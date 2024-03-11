import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "@/routes/Home.jsx";
import CustomerProposal from "@/routes/CustomerProposal.jsx";

import Layout from "@/components/Layout.jsx";
import { getCPList } from "@/lib/actions.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "customer-proposal",
        element: <CustomerProposal />,
        loader: async () => getCPList("name", 1, 10),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
