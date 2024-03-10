import { Router } from "express";
import createCP from "../controllers/createCP.js";

const routes = Router();

routes.post("/cp", createCP);

export default routes;
