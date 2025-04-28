import Menu from "../models/menu.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary";

const createMenuItem = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const foodImagePath = req.file?.path;
  const { itemName, cost, category, desc } = req.body;

  try {
    // if (user.role !== "ADMIN") {
    //   throw new ApiError(403, "Unauthorized");
    // }

    if (!foodImagePath || !itemName || !cost || !category || !desc) {
      throw new ApiError(400, "All fields not provided.");
    }

    const oldMenuItem = await Menu.findOne({ itemName: itemName });

    if (oldMenuItem) {
      throw new ApiError(400, "Menu item already exists.");
    }

    const foodImage = await uploadOnCloudinary(foodImagePath);

    const menuItem = await Menu.create({
      itemName: itemName,
      cost: cost,
      category: category,
      image: foodImage?.url,
      desc: desc,
    });

    if (!menuItem) {
      throw new ApiError(500, "Error creating the menu item.");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { menuItem }, "Menu item created successfully.")
      );
  } catch (error: any) {
    console.log(error);
    throw new ApiError(error.statusCode, error.data);
  }
});

const getMenuItems = asyncHandler(async (req: Request, res: Response) => {
  try {
    const menuItems = await Menu.find({ available: true });

    return res
      .status(200)
      .json(
        new ApiResponse(200, { menuItems }, "Menu items fetched successfully.")
      );
  } catch (error: any) {
    throw new ApiError(error.statusCode, error.data);
  }
});

const getMenuItem = asyncHandler(async (req: Request, res: Response) => {
  const { menuId } = req.body;

  try {
    const menuItem = await Menu.findById(menuId);

    if (!menuItem) {
      throw new ApiError(403, "Invalid menu ID.");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { menuItem }, "Fetched menu item successfully.")
      );
  } catch (error: any) {
    console.log(error);
    throw new ApiError(error.statusCode, error.data);
  }
});

const editMenuItem = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { itemName, cost, category, desc, available, menuId } = req.body;

  try {
    if (user.role !== "ADMIN") {
      throw new ApiError(403, "Unauthorized.");
    }

    const updateData: any = {};

    if (itemName) updateData.itemName = itemName;
    if (cost) updateData.itemName = cost;
    if (category) updateData.category = category;
    if (desc) updateData.desc = desc;
    if (available) updateData.available = available;

    const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateData, {
      new: true,
    });

    if (!updatedMenu) {
      throw new ApiError(500, "Failed to update menu.");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { updatedMenu }, "Updated menu successfully.")
      );
  } catch (error: any) {
    throw new ApiError(error.statusCode, error.data);
  }
});

export { getMenuItems, getMenuItem, createMenuItem, editMenuItem };
