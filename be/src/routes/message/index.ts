import { Request, Response } from "express";
import { dtoValidator, logger} from "../../helpers";
import { CreateDto } from './dto';
import * as messageController from "../../controllers/message";
const messageRoutes = (router) => {
    router.post("/message", async (req: Request, res: Response) => {
        logger.debug("Incoming request", req.url, req.body);
        const dtoValidation = await dtoValidator(CreateDto, req.body);
        if (dtoValidation) {
            logger.debug('Dto error', req.url, req.body, dtoValidation);
            return res.status(400).json({
                message: "Invalid request",
                error: dtoValidation,
            });
        } else {
            messageController.create(req, res);
        }
    });
}


export default messageRoutes;
