import cors from "cors";

const ALLOWED_ORIGINS = ["http://localhost:8080"];

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
});

export default corsMiddleware;
