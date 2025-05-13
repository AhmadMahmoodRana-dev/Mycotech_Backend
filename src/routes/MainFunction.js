import routes from "./AuthRoutes.js";
import complaintRoute from "./ComplaintRoutes.js";

const mainFunction = (app) => {
  app.use("/api", routes,complaintRoute);
};

export default mainFunction;
