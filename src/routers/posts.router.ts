import { Router } from "express";
import {postController} from "../controlers/posts.controler";
import {authMiddleware} from "../middlewares/auth.middleware";


const router = Router();

router.post(
    "/",
    // commonMiddleware.validateBody(UserValidator.create),
    // authController.singUp,
);
router.post("/create",
    authMiddleware.checkAccessToken,
    postController.create
);

// router.post(
//     "/sign-in",
//     commonMiddleware.validateBody(UserValidator.login),
//     authController.signIn,
// );
//
// router.post("/refresh",
//     authMiddleware.checkAccessToken,
//     authController.refresh);
//
// router.post("/log-out", authMiddleware.checkAccessToken, authController.logout);

export const postsRouter = router;