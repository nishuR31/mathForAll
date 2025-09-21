import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookie from "cookie-parser";
import logger from "../middleware/logger.middleware.js";
import codes from "../utils/statusCodes.js";
import path from "path";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import userRouter from "../routes/user.routes.js";
import infoRouter from "../routes/info.route.js";
import { fileURLToPath } from "url";

let app = express();

let corsOptions = {
  origin: "http://localhost:4028",
  credentials: true,
};

let helmetOptions = {
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
};

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookie());
app.use(logger);
let __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../frontend")));

let baseRoute = "/api/v1";

app.use(`${baseRoute}/sir`, userRouter);
app.use(`${baseRoute}/info`, infoRouter);



app.all("/{*splat}", (req, res) => {
  res
    .status(codes.notFound)
    .json(new ApiErrorResponse("Invalid route..", codes.notFound).res());
});
app.get("/", (req, res) => {
  res
    .status(codes.ok)
    .json(new ApiResponse("Server is spinning..", codes.ok).res());
});

app.use((err, req, res, next) => {
  res
    .status(codes.notFound)
    .json(
      new ApiErrorResponse("Error occured..", codes.notFound, {}, err).res()
    );
});

export default app;
