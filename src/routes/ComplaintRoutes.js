import { Router } from "express";
import SingleTechnicianAllComplaints from "../controllers/SingleTechnicianAllComplaints.js";

const complaintRoute = Router();

complaintRoute.get("/allcomplaint/:emp_id", SingleTechnicianAllComplaints);
export default complaintRoute;
