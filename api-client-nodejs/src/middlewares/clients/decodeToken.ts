import { clientRepo } from "./../../repositories/client-repo";
import { AppError } from "./../../errors/app-error";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const decodeToken = async (req: Request, res: Response) => {
    const body = await req.body;
    const clientToken = jwt.decode(body.token);
    if (!clientToken) {
        throw new AppError("Invalid Token");
    }
    const { sub: clientId } = clientToken;
    const clientFound = await clientRepo.findOne({
        where: {
            id: String(clientId),
        },
        relations: {
            contacts: true,
        },
    });
    if (!clientToken) {
        throw new AppError("Invalid Token");
    }
    return res.json(clientFound);
};
