import express from "express";
import { Application } from "express";
import path from "path";
import bodyParser from "body-parser";
import http from "http";
import os from "os";
import cookieParser from "cookie-parser";
import swaggerify from "./swagger";
import l from "./logger";
import Mongoose from "./mongoose";

const app = express();
const mongoose = new Mongoose();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + "/../..");
    app.set("appPath", root + "client");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`)); 
    
  }

  router(routes: (app: Application) => void): ExpressServer {
    swaggerify(app, routes);
    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = port => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          "development"} on port: ${port}}`
      );
    http.createServer(app).listen(p, welcome(p));
    mongoose.init();
    const root = path.normalize(__dirname + "/../..");
    app.get("/*", (req, res, next) => {
      if (req.url === '/' || req.url === '/spec') return next();
      if (req.url.startsWith('/api')) return next();
      const index = `${root}/public/index.html`;
      l.info('redirecting to index:', index)
      res.sendFile(index);
    });
    return app;
  }
}
