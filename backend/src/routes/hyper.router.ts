import { Router } from "express";
import { openPositionService } from "../services/hyper.service";

const router = Router();

router.post("/open", async (req, res) =>{
    let serviceResult = await openPositionService(req.body);
    res.json(serviceResult);
});

export default router;