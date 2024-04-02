import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createCustomerProposal, getCustomers } from "@/lib/actions.js";
import { routeConstants } from "@/constants";

import Home from "@/routes/Home.jsx";
import CustomerProposals from "@/routes/CustomerProposals.jsx";

import Layout from "@/components/Layout.jsx";
import ErrorPage from "@/components/ErrorPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: routeConstants["home"].method.get,
    element: <Layout />,
    loader: async () => {
      const customers = await getCustomers();
      return { customers };
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routeConstants["customer-proposals"].method.get,
        element: <CustomerProposals />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
