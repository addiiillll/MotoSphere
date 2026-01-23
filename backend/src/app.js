import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Production logic
const isProduction = process.env.NODE_ENV === "production";

// Security headers
app.use(helmet());

// Request logging
app.use(morgan(isProduction ? "combined" : "dev"));

// Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

if (isProduction) {
  app.use("/api", limiter);
}

app.use(
  cors({
    origin: isProduction
      ? process.env.ALLOWED_ORIGINS?.split(",")
      : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
