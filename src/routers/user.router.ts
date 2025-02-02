import {Router} from "express";
import {userController} from "../controlers/user.controler";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userController.getList);

router.get("/me",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid('userId'),
    userController.getMe
);
router.get("/email/me",
    authMiddleware.checkAccessToken,
    userController.getMeEmail.bind(userController));

router.put("/me",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateMe,);

router.delete("/me",
    authMiddleware.checkAccessToken,
    userController.deleteMe);

router.get("/:userId",
    commonMiddleware.isIdValid('userId'),
    userController.getUserById
);

export const userRouter = router;