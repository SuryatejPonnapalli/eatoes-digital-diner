import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createMenuItem,
  editMenuItem,
  getMenuItem,
  getMenuItems,
} from "../controllers/menu.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();
router.route("/get-menu-items").get(getMenuItems);
router.route("/get-menu-item").post(getMenuItem);
router
  .route("/add-menu")
  .post(authMiddleware, upload.single("foodImage"), createMenuItem);
router.route("/edit-menu").put(authMiddleware, editMenuItem);

export default router;
