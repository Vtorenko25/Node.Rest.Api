import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { config } from "./configs/config";
import { MONGO_DB_URL } from "./constants/url.constant";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { postsRouter } from "./routers/posts.router";
import { userRouter } from "./routers/user.router";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postsRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message ?? "Something went wrong";

    res.status(status).json({ status, message });
  },
);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

app.listen(config.port, async () => {
  await mongoose.connect(MONGO_DB_URL);
  console.log(`Server has been started on port ${config.port}`);
});
