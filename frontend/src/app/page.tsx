"use client";

import { FormEvent, useState, useEffect } from "react";
import { listOrderRequest, submitRequest } from "./lib/api";
import { Side, Order } from "./lib/api";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState<Side>("long");
  const [sizeUsd, setSizeUsd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  async function loadOrders() {
    setLoading(true);
    setError("");

    try {
      const nextOrders = await listOrderRequest();
      setOrders(nextOrders);
    } catch {
      setError("Orders failed to be listed");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void loadOrders();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const normalizedSymbol = symbol.trim();
    const parsedSize = Number(sizeUsd);

    if (!normalizedSymbol) {
      setError("Symbol is required");
      return;
    }

    if (!sizeUsd) {
      setError("USD size is required");
      return;
    }

    if (!Number.isFinite(parsedSize) || parsedSize <= 0) {
      setError("USD size must be a positive number");
      return;
    }

    setLoading(true);

    try {
      await submitRequest({
        symbol: normalizedSymbol.toUpperCase(),
        side, // already typed as "long" | "short"
        sizeUsd: parsedSize,
      });

      setSuccess("Transaction created successfully");
      await loadOrders();
      // optional: clear form here
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" min-h-screen bg-zinc-400 font-sans ">
      <main className="min-h-screen w-full max-w-3xl flex-col items-center justify-between py-10 px-16 bg-zinc-400 sm:items-start">
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-5 sm:mt-10 sm:space-y-6"
        >
          <div>
            <label className="mb-2 block text-lg font-semibold text-slate-900">
              Symbol
            </label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Please enter the symbol"
              className="w-full rounded-xl border border-slate-200 bg-[#ececf0] px-4 py-3 text-lg text-slate-700 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              required
            ></input>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-slate-900">
              Side
            </label>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value as Side)}
              className="w-full rounded-xl border border-slate-200 bg-[#ececf0] px-4 py-3 text-lg text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              required
            >
              <option value="long">long</option>
              <option value="short">short</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold text-slate-900">
              Size in USD
            </label>
            <input
              type="number"
              value={sizeUsd}
              onChange={(e) => setSizeUsd(e.target.value)}
              placeholder="Please enter your size in USD"
              className="w-full rounded-xl border border-slate-200 bg-[#ececf0] px-4 py-3 text-lg text-slate-700 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              required
            ></input>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#01021f] px-4 py-3 text-xl font-semibold text-white transition hover:bg-[#080a2b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating transaction" : "Create transaction"}
          </button>

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </p>
          ) : null}
        </form>

        {loading ? (
          <p className="mt-4 text-sm text-slate-300">loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-sm text-slate-300">no orders found</p>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div key={order.orderId}>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-slate-900">{order.symbol}</p>
                  <p className="font-semibold text-slate-900">{order.side}</p>
                  <p className="font-semibold text-slate-900">
                    {order.sizeUsd}
                  </p>
                  <p className="font-semibold text-slate-900">
                    {order.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
