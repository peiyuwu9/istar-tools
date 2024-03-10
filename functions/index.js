import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase/app";
import express from "express";
import routes from "./routes/index.js";

const server = express();
server.use(express.json());
server.use("/api", routes);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTO_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGESENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const app = onRequest(server);
