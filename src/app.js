import express from "express";
import mainFunction from "./routes/MainFunction.js";
import "dotenv/config";

const app = express();

app.use(express.json());
mainFunction(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
