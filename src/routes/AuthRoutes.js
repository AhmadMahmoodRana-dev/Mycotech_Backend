import express from "express";
import Login from "../controllers/Login.controller.js";
import getProfile from "../controllers/Profile.controller.js";

const routes = express.Router();

routes.post("/auth/login", Login);
routes.get("/auth/profile/:emp_id", getProfile);
export default routes;
