import {Router} from "express";
import { authController } from "../controlers/auth.controler";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router =  Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.singUp
)

router.post(
    "/sign-in",
    // commonMiddleware.validateBody(UserValidator.create),
    authController.signIn,
    );

export const authRouter = router;