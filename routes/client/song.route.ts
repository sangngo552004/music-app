import { Router } from "express";
const router : Router = Router();
import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic",controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/like/:type/:songId",controller.like);

router.patch("/favorite/:type/:songId", controller.favorite);

router.patch("/listen/:idSong", controller.listen);

export const songRoutes : Router = router;