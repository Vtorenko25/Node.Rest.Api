import { Router } from "express";

import { postController } from "../controlers/posts.controler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { PostValidator } from "../validators/post.validator";

const router = Router();

router.get("/", postController.getList);
router.post(
  "/create",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(PostValidator.create),
  postController.create,
);

router.delete("/me", authMiddleware.checkAccessToken, postController.deleteMe);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(PostValidator.update),
  postController.updateMe,
);

export const postsRouter = router;
