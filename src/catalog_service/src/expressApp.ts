import express from "express";
import catalogRouter from "./api/catalog.routes";
import { HandleErrorWithLogger } from "./utils/error";
import { httpLogger } from "./utils/logger";

const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("/",catalogRouter); 

app.use(HandleErrorWithLogger);

export default app;
