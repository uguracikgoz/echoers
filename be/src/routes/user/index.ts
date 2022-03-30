import * as UserController from "../../controllers/user";
import { Request, Response } from "express";
import { dtoValidator, logger} from "../../helpers";
import { CreateDto, GetDto } from './dto';

const userRoutes = (router) => {
    router.get("/user", async (req: Request, res: Response) => {
        logger.debug("Incoming request", {url: req.url, params: req.query});
        const dtoValidation = await dtoValidator(GetDto, req.query);
        if (dtoValidation) {
            logger.debug('Dto error', {url: req.url, params: req.query,errors: dtoValidation});
            return res.status(400).json({
                message: "Invalid request",
                error: dtoValidation,
            });
        } else {
            UserController.get(req, res);
        }
    });
    router.post("/user", async (req: Request, res: Response) => {
        logger.debug("Incoming request", req.url, req.body);
        const dtoValidation = await dtoValidator(CreateDto, req.body);
        if (dtoValidation) {
            logger.debug('Dto error', req.url, req.body, dtoValidation);
            return res.status(400).json({
                message: "Invalid request",
                error: dtoValidation,
            });
        } else {
            UserController.create(req, res);
        }
    });
}


export default userRoutes;
