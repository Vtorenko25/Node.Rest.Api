import { Router } from "express";
import {postController} from "../controlers/posts.controler";
import {authMiddleware} from "../middlewares/auth.middleware";



const router = Router();

router.get(
    "/",
    postController.getList,
);
router.post("/create",
    authMiddleware.checkAccessToken,
    postController.create
);

router.delete("/me",
    authMiddleware.checkAccessToken,
    postController.deleteMe
);

router.put("/me",
    authMiddleware.checkAccessToken,
    postController.updateMe
    )

export const postsRouter = router;