import { Router } from "express";
import SingleTechnicianAllComplaints from "../controllers/SingleTechnicianAllComplaints.js";
import SingleComplaintDetail from "../controllers/SingleComplaintDetail.js";

const complaintRoute = Router();

complaintRoute.get("/allcomplaint/:emp_id", SingleTechnicianAllComplaints);
complaintRoute.get("/allcomplaint/single/:complaint_id", SingleComplaintDetail);
export default complaintRoute;
