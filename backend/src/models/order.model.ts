import { z } from "zod";

export const OrderSchema = z.object({
  userId: z.number(),
  items: z.string().array().nonempty({ message: "Cant be empty" }),
  totalPrice: z.number(),
});
