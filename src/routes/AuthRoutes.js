import express from "express";
import Login from "../controllers/Login.controller.js";

const routes = express.Router();

routes.post("/auth/login", Login);
routes.get("/", (req, res) => {
  res.send("HELLO WORLDD");
});
export default routes;
