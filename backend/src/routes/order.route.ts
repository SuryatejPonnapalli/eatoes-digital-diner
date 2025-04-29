import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  completeOrder,
  createOrder,
  getOrders,
} from "../controllers/order.controller";

const router = Router();

router.use(authMiddleware);
router.route("/get-orders").get(getOrders);
router.route("/create-order").post(createOrder);
router.route("/update-order").put(completeOrder);

export default router;
