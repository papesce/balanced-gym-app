import express from "express";
import { Application } from "express";
import path from "path";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import l from "./common/logger";
import Mongoose from "./common/mongoose";

const app = express();
const mongoose = new Mongoose();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + "/..");
    app.set("appPath", root + "client");
    app.use(cors());
    app.use(express.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);

    try {
      const specPath = path.join(__dirname, "api/swagger/Api.v3.yaml");
      const apiSpec = YAML.load(specPath);
      app.use("/spec", swaggerUi.serve as any, swaggerUi.setup(apiSpec) as any);
    } catch {
      l.warn("Swagger spec not found, /spec endpoint not available");
    }

    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = (port: string | number) => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          "development"} on port: ${port}`
      );
    http.createServer(app).listen(p, welcome(p));
    mongoose.init();
    const root = path.normalize(__dirname + "/..");
    app.get("/*", (req, res, next) => {
      if (req.url === "/" || req.url === "/spec") return next();
      if (req.url.startsWith("/api")) return next();
      const index = `${root}/public/index.html`;
      l.info("redirecting to index: %s", index);
      res.sendFile(index);
    });
    return app;
  }
}
