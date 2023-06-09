import { contactRepo } from "../../repositories/contact-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyNotExistContactById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const existContact = await contactRepo.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!existContact) {
        throw new AppError("Contact Not Found");
    }
    req.contactFound = existContact;
    return next();
};
