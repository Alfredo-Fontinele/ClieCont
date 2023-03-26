import { AppError } from "./../../errors/app-error";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { clientRepo } from "./../../repositories/client-repo";

export const decodeToken = async (req: Request, res: Response) => {
    const { token } = await req.body;
    const clientToken = jwt.decode(token);
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
