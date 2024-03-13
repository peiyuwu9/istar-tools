import { Router } from "express";
import { routeConstants } from "../../src/constants.js";

import getCustomerProposals from "../controllers/getCustomerProposals.js";
import createCustomerProposal from "../controllers/createCustomerProposal.js";
import getCustomers from "../controllers/getCustomers.js";

const routes = Router();

// customer proposal
routes.get(
  `/${routeConstants["customer-proposals"].path.get}`,
  getCustomerProposals
);
routes.post(
  `/${routeConstants["customer-proposal"].path.post}`,
  createCustomerProposal
);

// customer
routes.get(`/${routeConstants["customers"].path.get}`, getCustomers);

export default routes;
