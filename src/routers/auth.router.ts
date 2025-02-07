import { Router } from "express";

import { authController } from "../controlers/auth.controler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.validateBody(UserValidator.create),
  authController.singUp,
);

router.post(
  "/sign-in",
  commonMiddleware.validateBody(UserValidator.login),
  authController.signIn,
);

router.post(
    "/refresh",
    authMiddleware.checkAccessToken,
    authController.refresh
);

router.post(
    "/log-out",
    authMiddleware.checkAccessToken,
    authController.logout
);

export const authRouter = router;
