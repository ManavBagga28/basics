import express from "express";
import catalogRouter from "./src/api/catalog.routes";
import { HandleErrorWithLogger } from "./src/utils/error";
import { httpLogger } from "./src/utils/logger";

const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("/",catalogRouter); 

app.use(HandleErrorWithLogger);

export default app;