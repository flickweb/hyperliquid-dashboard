import { randomUUID } from "crypto";

import type { OpenPositionInput, Side } from "../validations/hyper.validation";

type Order = {
  orderId: string;
  symbol: string;
  side: Side;
  sizeUsd: number;
  createdAt: string;
};
const orders: Order[] = [];

export async function openPositionService(params: OpenPositionInput) {
  const { symbol, side, sizeUsd } = params;
  console.log(params);

  const order = {
    orderId: randomUUID(),
    symbol,
    side,
    sizeUsd,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  return { status: "success", data: order };
}

export async function listOrders(){
    return orders;
}
