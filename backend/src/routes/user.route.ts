import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router: Router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
