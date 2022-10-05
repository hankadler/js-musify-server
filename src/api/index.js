// import cors from "cors";
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import { songs, albums, artists } from "./v1";
import config from "../config";
import catchErrors from "./middlewares/catchErrors";
// import staticRoutes from "./v1/routes/staticRoutes";

const api = express();

if (config.env !== "production") {
  api.use(morgan("dev", { skip: async (req) => req.originalUrl.includes("/graphql") }));
}
api.use(express.json({ limit: "16mb" }));
api.use(express.urlencoded({ extended: false, limit: "16mb" }));
// api.use(cors());

// api.use(express.static("../client/src/assets/images"));
// staticRoutes.forEach((route) => api.use(route, express.static("../client/dist")));
api.get(`${config.api.path}`, (req, res) => res.status(200).json({ data: { message: "OK" } }));
api.use(`${config.api.path}/songs`, songs);
api.use(`${config.api.path}/albums`, albums);
api.use(`${config.api.path}/artists`, artists);
api.use(catchErrors());

export default api;
