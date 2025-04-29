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

const completeOrder = asyncHandler(async (req: Request, res: Response) => {
  const { orderId, status } = req.body;
  const user = req.user;

  try {
    // if (user.role !== "ADMIN") {
    //   throw new ApiError(403, "Unauthorized.");
    // }
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status,
      },
    });

    if (!updatedOrder) {
      throw new ApiError(400, "No order found.");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, { updatedOrder }, "Order updated successfully.")
      );
  } catch (error: any) {
    throw new ApiError(error.status, error.message || "Error updating order.");
  }
});
export { createOrder, getOrders, completeOrder };
