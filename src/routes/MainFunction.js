import routes from "./AuthRoutes.js";

const mainFunction = (app) => {
  app.use("/api", routes);
};

export default mainFunction;
