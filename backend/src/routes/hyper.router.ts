import { Router } from "express";
import { listOrderController, openPositionController } from "../controllers/hyper.controller";

const router = Router();

router.post("/open", openPositionController);
router.get("/list", listOrderController);

export default router;