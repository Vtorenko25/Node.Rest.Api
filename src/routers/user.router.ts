import { Router } from "express";

import { userController } from "../controlers/user.controler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getList);

router.get(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.getMe,
);
router.get(
  "/getMeEmail/:userEmail/",
  authMiddleware.checkAccessToken,
  userController.getMeEmail.bind(userController),
);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(UserValidator.update),
  userController.updateMe,
);

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);

export const userRouter = router;
