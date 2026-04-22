import z from "zod";

export const openPositionInput = z.object({
    symbol: z.string().trim().min(1),
    side: z.enum(["long", "short"]),
    sizeUsd: z.coerce.number().positive(),
});