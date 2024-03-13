export const routeConstants = {
  home: {
    name: "Home",
    title: "Welcome!",
    path: {
      get: "/",
    },
  },
  "customer-proposals": {
    name: "Customer Proposal",
    title: "Customer Proposal",
    path: {
      get: "customer-proposals",
    },
  },
  "customer-proposal": {
    name: "Customer Proposal",
    title: "Customer Proposal",
    path: {
      get: "customer-proposal/:id",
      post: "customer-proposal",
    },
  },
  customers: {
    name: "Customer",
    title: "Customers",
    path: {
      get: "customers",
    },
  },
};
