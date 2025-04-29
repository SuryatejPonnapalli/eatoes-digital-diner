import { z } from "zod";

export const OrderSchema = z.object({
  items: z.array(
    z.object({
      itemName: z.string(),
      quantity: z.number(),
    })
  ),
  totalPrice: z.number(),
});
