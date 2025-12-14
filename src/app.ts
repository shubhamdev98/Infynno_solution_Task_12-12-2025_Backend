import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import taskRouter from "./routes/task.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server is running 🚀" });
});

app.use(errorMiddleware);

export default app;
