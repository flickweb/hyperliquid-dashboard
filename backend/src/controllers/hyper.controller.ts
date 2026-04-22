import { Request, Response, NextFunction } from "express";
import { openPositionService } from "../services/hyper.service";
import { listOrders } from "../services/hyper.service";
import { ZodError } from "zod";
import { openPositionInput } from "../validations/hyper.validation";

export async function openPositionController(
  req: Request,
  res: Response,
) {
  try {
    const payload = openPositionInput.parse(req.body);
    const serviceResult = await openPositionService({
      symbol: payload.symbol,
      side: payload.side,
      sizeUsd: payload.sizeUsd,
    });
    return res.json(serviceResult);
  } catch (error) {
    if(error instanceof ZodError){
        return res.status(400).json({
        message: "Validation error",
        errors: error.flatten(),
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function listOrderController(
  req: Request,
  res: Response,
) {
  try {
    const result = await listOrders();
    return res.status(200).json({
      message: "orders fetched",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
}
