import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { getCustomers } from "@/lib/actions.js";
import { routeConstants } from "@/constants";

import Home from "@/routes/Home.jsx";
import CustomerProposals from "@/routes/CustomerProposals.jsx";
import Settings from "@/routes/Settings.jsx";

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
        errorElement: <ErrorPage message={"Something Went Wrong!"} />,
      },
      {
        path: routeConstants["settings"].method.get,
        element: <Settings />,
      },
    ],
    errorElement: <ErrorPage message={"Something Went Wrong!"} />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
