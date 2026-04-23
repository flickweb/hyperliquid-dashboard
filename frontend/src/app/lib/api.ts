const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export type Side = "long" | "short";
export type OpenPositionRequest = {
  symbol: string;
  side: Side;
  sizeUsd: number;
};
export type Order = {
    orderId: string;
  symbol: string;
  side: Side;
  sizeUsd: number;
  createdAt: string;
}

export async function submitRequest(payload: OpenPositionRequest) {
  const res = await fetch(`${API_BASE_URL}/hyper/open`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ?? "Request failed");
  }
  return data;
}

export async function listOrderRequest() {
  const res = await fetch(`${API_BASE_URL}/hyper/list`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ?? "Request failed");
  }
  return data.data;
}
