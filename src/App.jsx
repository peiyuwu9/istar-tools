import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routeConstants } from "@/constants";

import Home from "@/routes/Home.jsx";
import CustomerProposals from "@/routes/CustomerProposals.jsx";

import Layout from "@/components/Layout.jsx";
import { getCustomerProposals, getCsutomers } from "@/lib/actions.js";

const router = createBrowserRouter([
  {
    path: routeConstants["home"].path,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routeConstants["customer-proposals"].path,
        element: <CustomerProposals />,
        loader: async () => {
          const data = await Promise.all([
            getCustomerProposals("program", 1, 10),
            getCsutomers("name", 1, 100),
          ]);
          return { customerProposals: data[0], customers: data[1] };
        },
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
