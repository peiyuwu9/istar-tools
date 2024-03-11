import { Router } from "express";

import getCPList from "../controllers/getCPList.js";
import createCP from "../controllers/createCP.js";

const routes = Router();

routes.get("/cps", getCPList);
routes.post("/cp", createCP);

export default routes;
