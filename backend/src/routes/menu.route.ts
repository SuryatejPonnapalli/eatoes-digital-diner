import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.route("get-menu").get();
router.route("add-menu").post();
router.route("edit-menu").put();
router.route("delete-menu").delete();

export default router;
