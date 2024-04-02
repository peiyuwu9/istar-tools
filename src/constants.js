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
    },
  },
  customers: {
    name: "Customer",
    title: "Customers",
    method: {
      get: "customers",
    },
  },
};

export const dataSchemaSpec = {
  customerProposalProgramMaxLength: 30,
};
