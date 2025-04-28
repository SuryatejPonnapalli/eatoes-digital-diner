import { z } from "zod";

export const OrderSchema = z.object({
  items: z.string().array().nonempty({ message: "Cant be empty" }),
  totalPrice: z.number(),
});
