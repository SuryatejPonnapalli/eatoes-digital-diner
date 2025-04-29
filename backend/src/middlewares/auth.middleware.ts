import { NextFunction, Response, Request } from "express";
import { ApiError } from "../utils/apiError";
import * as jwt from "jsonwebtoken";
import { prisma } from "../db";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || req.cookies?.accessToken;
  console.log("here", token);

  if (!token) {
    throw new ApiError(401, "Unauthorized, no token.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await prisma.user.findFirst({ where: { id: payload.userId } });

    if (!user) {
      throw new ApiError(401, "Unathorized.");
    }
    req.user = user;
    if (req.user) {
      next();
    }
  } catch (error) {
    throw new ApiError(401, "Unathorized.");
  }
};
