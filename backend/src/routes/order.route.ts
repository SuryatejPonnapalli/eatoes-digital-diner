import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.route("get-order").get();
router.route("create-order").post();
