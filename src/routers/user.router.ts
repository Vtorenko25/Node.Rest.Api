import {Router} from "express";
import {userController} from "../controlers/user.controler";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.post("/", commonMiddleware.validateBody(UserValidator.create), userController.create);

router.get("/:userId", commonMiddleware.isIdValid('userId'), userController.getUserById);
router.get("/email/:userEmail", userController.getUserByEmail.bind(userController));
router.put("/:userId", commonMiddleware.isIdValid("userId"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateUser,);
router.delete("/:userId", userController.deleteUser);

export const userRouter = router;