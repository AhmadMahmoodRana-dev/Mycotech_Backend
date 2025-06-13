import { Router } from "express";
import InventoryItems from "../controllers/InventoryItems.controller.js";

const InventoryRoute = Router();

InventoryRoute.get("/allInventory", InventoryItems);
export default InventoryRoute;
