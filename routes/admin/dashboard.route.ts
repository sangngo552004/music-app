import {Router} from "express";
const router = Router();

import * as controller from "../../controllers/admin/dashboard.controller";

router.get("/", controller.index);

export const dashboardRoutes = router;