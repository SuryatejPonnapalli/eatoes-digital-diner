import { z } from "zod";

export const OrderSchema = z.object({
  cart: z.array(
    z.object({
      itemName: z.string(),
      quantity: z.number(),
      cost: z.number(),
    })
  ),
  totalPrice: z.number(),
});
