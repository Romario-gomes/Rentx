import "reflect-metadata";
import dotenv from "dotenv";
import "dotenv/config";
import "@shared/container";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import "express-async-errors";

import upload from "@config/upload";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// rota padrão onde vai ficar a documentação do projeto
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      Message: `Internal server error - ${err.message}`,
    });
  },
);
export { app };
