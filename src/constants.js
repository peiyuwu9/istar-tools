export const routeConstants = {
  home: {
    name: "Home",
    title: "Welcome!",
    method: {
      get: "/",
    },
  },
  "customer-proposals": {
    name: "Customer Proposal",
    title: "Customer Proposal",
    method: {
      get: "customer-proposals",
    },
  },
  "customer-proposal": {
    name: "Customer Proposal",
    title: "Customer Proposal",
    method: {
      get: "customer-proposal/:id",
      post: "customer-proposal",
      delete: "customer-proposal?id={{id}}&filename={{filename}}",
    },
  },
  customers: {
    name: "Customer",
    title: "Customers",
    method: {
      get: "customers",
    },
  },
  settings: {
    name: "Settings",
    title: "Settings",
    method: {
      get: "settings",
    },
  },
};

export const dataSchemaSpec = {
  customerProposalProgramMaxLength: 30,
};
