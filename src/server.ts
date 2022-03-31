import express from "express";
import swaggerUi from 'swagger-ui-express';
import "./database";
import "./shared/container";
import { router } from './routes';
import swaggerFile from "./swagger.json";


const app = express();

app.use(express.json());


//rota padrão onde vai ficar a documentação do projeto
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running"));