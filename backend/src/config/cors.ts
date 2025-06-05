import { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL!,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
