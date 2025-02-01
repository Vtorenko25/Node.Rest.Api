import {Router} from "express";
import {userController} from "../controlers/user.controler";
import {commonMiddleware} from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getList);
router.post("/", commonMiddleware.validateUserData, userController.create);

router.get("/:userId", commonMiddleware.isIdValid('userId'), userController.getUserById);
router.put("/:userId", commonMiddleware.validateUserData, userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export const userRouter = router;