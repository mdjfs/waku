import express from "express";
import cors from "cors";
import "./database";
import config from "./config";
import router from "./routes";
import auth from "./controllers/auth";

const app = express();

auth.initialize(app);

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
