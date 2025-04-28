import { Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db/index";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { SignupSchema } from "../models/user.model";

const registerUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      SignupSchema.parse(req.body);
      const { name, email, password } = req.body;

      let user = await prisma.user.findFirst({ where: { email } });

      if (user) {
        throw new ApiError(400, "User already exists.");
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashSync(password, 10),
        },
      });
      return res
        .status(200)
        .json(new ApiResponse(200, { user }, "User successfully created."));
    } catch (error: any) {
      console.log(error);
      throw new ApiError(400, error?.issues || "Invalid input data");
    }
  }
);

const loginUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    if (!compareSync(password, user.password)) {
      throw new ApiError(403, "Incorrect password.");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRY,
      } as jwt.SignOptions
    );

    const options: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax" | "strict" | "none" | undefined;
      maxAge: number;
    } = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    };
    res.cookie("accessToken", token, options);

    return res
      .status(200)
      .json(new ApiResponse(200, { user, token }, "Logged in successfully."));
  }
);

export { registerUser, loginUser };
