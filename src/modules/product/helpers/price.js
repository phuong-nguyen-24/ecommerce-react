export function convertPrice(priceStr) {
    if(!priceStr) return 0;
    return Number(priceStr.slice(1).replace(",", ""));
}

