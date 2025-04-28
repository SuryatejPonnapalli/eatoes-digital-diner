import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.route";
import orderRouter from "./routes/order.route";
import menuRouter from "./routes/menu.route";

//assign routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/menu", menuRouter);

export { app };
