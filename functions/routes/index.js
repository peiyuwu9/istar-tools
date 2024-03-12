import { Router } from "express";
import { routeConstants } from "../../src/constants.js";

import getCustomerProposals from "../controllers/getCustomerProposals.js";
import createCustomerProposal from "../controllers/createCustomerProposal.js";
import getCustomers from "../controllers/getCustomers.js";

const routes = Router();

// customer proposal
routes.get(
  `/${routeConstants["customer-proposals"].path}`,
  getCustomerProposals
);
routes.get(
  `/${routeConstants["customer-proposal"].path}`,
  createCustomerProposal
);

// customer
routes.get(`/${routeConstants["customers"].path}`, getCustomers);

export default routes;
