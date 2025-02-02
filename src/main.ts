import express, { NextFunction, Request, Response } from "express";
import {ApiError} from "./errors/api.error";
import {userRouter} from "./routers/user.router";
import {config} from "./configs/config";
import * as mongoose from "mongoose";
import {authRouter} from "./routers/auth.router";


const app = express();
app.use(express.json());

app.use("/auth", authRouter)
app.use("/users", userRouter);

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
    await mongoose.connect(config.mongoUrl)
    console.log(`Server has been started on port ${config.port}`);
});