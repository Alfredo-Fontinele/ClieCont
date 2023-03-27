import { verifyClientIsSameClientLoggedById } from "./../middlewares/clients/verifyClientIsSameClientLoggedById";
import { verifyNotExistClientByEmail } from "../middlewares/clients/verifyNotExistClientByEmail";
import {
    getTokenSchema,
    loginClientSchema,
    registerClientSchema,
} from "./../schemas/clients";
import { verifyAlreadyExistClient } from "../middlewares/clients/verifyAlreadyExistClient";
import { verifyNotExistClientById } from "../middlewares/clients/verifyNotExistClientById";
import { verifyClientIsLogged } from "./../middlewares/clients/verifyClientIsLogged";
import { validateSchema } from "../middlewares/validators/validateSchema";
import { ClientController } from "../controllers/client.controller";
import { decodeToken } from "./../middlewares/clients/decodeToken";
import { Router } from "express";
import "express-async-errors";

export const clientRoutes = Router();

clientRoutes.post(
    "/login",
    validateSchema(loginClientSchema),
    verifyNotExistClientByEmail,
    ClientController.login
);

clientRoutes.post(
    "/",
    validateSchema(registerClientSchema),
    verifyAlreadyExistClient,
    ClientController.create
);

clientRoutes.patch(
    "/:id",
    verifyClientIsSameClientLoggedById,
    verifyNotExistClientById,
    ClientController.update
);

clientRoutes.get(
    "/:id",
    verifyClientIsSameClientLoggedById,
    verifyNotExistClientById,
    ClientController.getById
);

clientRoutes.post("/owner", validateSchema(getTokenSchema), decodeToken);

clientRoutes.delete(
    "/:id",
    verifyClientIsSameClientLoggedById,
    verifyNotExistClientById,
    ClientController.delete
);
