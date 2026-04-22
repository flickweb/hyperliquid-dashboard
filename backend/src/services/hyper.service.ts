import { randomUUID } from "crypto";

type Order = {
  orderId: string;
  symbol: string;
  side: string;
  sizeUsd: number;
  createdAt: string;
};
const orders: Order[] = [];

export async function openPositionService(params: {
  symbol: string;
  side: string;
  sizeUsd: number;
}) {
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
