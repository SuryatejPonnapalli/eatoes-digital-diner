import { Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { prisma } from "../db";
import { OrderSchema } from "../models/order.model";

const createOrder = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    try {
      OrderSchema.parse(req.body);
      const user = req.user;
      const { cart, totalPrice } = req.body;
      if (!cart || !totalPrice) {
        throw new ApiError(400, "Data to create order not provided.");
      }

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          items: cart,
          totalPrice: totalPrice,
        },
      });

      if (!order) {
        throw new ApiError(500, "Order could not be created");
      }
      return res
        .status(200)
        .json(new ApiResponse(200, { order }, "Order created successfully."));
    } catch (error) {
      console.log(error);
      throw new ApiError(403, "Could not create order.");
    }
  }
);

const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const orders = await prisma.order.findMany({ where: { userId: user.id } });

  return res
    .status(200)
    .json(new ApiResponse(200, { orders }, "Orders fetched successfully."));
});

export { createOrder, getOrders };
