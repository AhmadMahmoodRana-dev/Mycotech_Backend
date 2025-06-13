import routes from "./AuthRoutes.js";
import complaintRoute from "./ComplaintRoutes.js";
import InventoryRoute from "./InventoryRoute.js";

const mainFunction = (app) => {
  app.use("/api", routes,complaintRoute,InventoryRoute);
};

export default mainFunction;
