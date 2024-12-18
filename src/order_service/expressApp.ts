import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cartRoutes from "~src/api/cart.routes";
import orderRoutes from "~src/api/order.routes";
import { httpLogger } from "~src/utils/logger";
import { HandleErrorWithLogger } from "~src/utils/error/handler";
import { InitializeBroker } from "~src/services/broker.service";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  await InitializeBroker();

  app.use(cartRoutes);
  app.use(orderRoutes);

  app.use("/", (req: Request, res: Response, _: NextFunction) => {
    return res.status(200).json({ message: "I am healthy!" });
  });

  app.use(HandleErrorWithLogger);

  return app;
};