import {Router} from "express";
const router = Router();

import * as controller from "../../controllers/admin/song.controller";

router.get("/", controller.index);

export const songRoutes = router;