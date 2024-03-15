import { Router } from "express";

import getCustomerProposals from "../controllers/getCustomerProposals.js";
import createCustomerProposal from "../controllers/createCustomerProposal.js";
import getCustomers from "../controllers/getCustomers.js";

const routes = Router();

// customer proposal
routes.get(`/customer-proposals`, getCustomerProposals);
routes.post(`/customer-proposal`, createCustomerProposal);

// customer
routes.get(`/customers`, getCustomers);

export default routes;
