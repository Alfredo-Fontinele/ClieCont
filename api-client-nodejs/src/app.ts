import { HandlerError } from "./errors/handler-error";
import { routes } from "./routes/_index.routes";
import express from "express";
import "express-async-errors";
// import cors from "cors";

export const app = express();

app.use(express.json());
// app.use(cors());
app.use(routes);
app.use(HandlerError);
