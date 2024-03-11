import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home.jsx";
import CustomerProposal from "./routes/CustomerProposal.jsx";

import Layout from "./components/Layout.jsx";

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
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
