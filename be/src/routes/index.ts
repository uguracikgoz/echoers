import { Router } from "express";

import UserRoutes from './user'
import MessageRoutes from './message'

const router = Router();

UserRoutes(router);
MessageRoutes(router);

export default router;
