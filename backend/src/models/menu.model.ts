import mongoose, { Document, Schema } from "mongoose";

export interface IMenu extends Document {
  itemName: string;
  cost: number;
  category: string;
  image: string;
  desc: string;
  available: boolean;
}

const menuSchema: Schema<IMenu> = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["starter", "main-course", "dessert", "drink"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.models.Menu || mongoose.model<IMenu>("Menu", menuSchema);

export default Menu;
