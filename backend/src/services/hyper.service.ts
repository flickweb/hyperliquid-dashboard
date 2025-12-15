export async function openPositionService(params: {symbol: string, side: string, sizeUsd: number}){
    const {symbol, side, sizeUsd} = params;
    return {
        status : "success",
        data : params
    }
}