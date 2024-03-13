import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { getCustomerProposals, getCsutomers } from "@/lib/actions.js";
import { routeConstants } from "@/constants";

import Home from "@/routes/Home.jsx";
import CustomerProposals from "@/routes/CustomerProposals.jsx";

import Layout from "@/components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: routeConstants["home"].path.get,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routeConstants["customer-proposals"].path.get,
        element: <CustomerProposals />,
        loader: async () => {
          const currentYear = new Date().getFullYear();
          const data = await Promise.all([
            getCustomerProposals(currentYear),
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
