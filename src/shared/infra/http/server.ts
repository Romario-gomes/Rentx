import "reflect-metadata";
import "@shared/container";
import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());

// rota padrão onde vai ficar a documentação do projeto
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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

app.listen(3333, () => console.log("Server is running"));
