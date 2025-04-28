import { Response, Request } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(new ApiResponse(200, {}, "Register works"));
  }
);

const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(new ApiResponse(200, {}, "Login works"));
  }
);

export { registerUser, loginUser };
