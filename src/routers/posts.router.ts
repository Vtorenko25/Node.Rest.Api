import { Router } from "express";
import {postController} from "../controlers/posts.controler";

const router = Router();

router.post(
    "/",
    // commonMiddleware.validateBody(UserValidator.create),
    // authController.singUp,
);
router.post("/create", postController.create);

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