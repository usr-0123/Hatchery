import { formatToMoney } from "./priceDisplayConversion.js";

export function calculateProfits(batches, sales, monthYear = null) {

    function getMonthYear(dateStr) {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}-${year}`;
    }

    const batchTotals = batches.reduce(
        (acc, batch) => {
            if (!monthYear || getMonthYear(batch.receivedDate) === monthYear) {
                acc.totalEggs += batch.totalEggs;
                acc.totalPrice += batch.totalPrice;
            }
            return acc;
        },
        { totalEggs: 0, totalPrice: 0 }
    );

    const salesTotals = sales.reduce(
        (acc, sale) => {
            if (!monthYear || getMonthYear(sale.saleDate) === monthYear) {
                acc.quantitySold += sale.quantitySold;
                acc.totalAmount += sale.totalAmount;
            }
            return acc;
        },
        { quantitySold: 0, totalAmount: 0 }
    );

    const profit = formatToMoney(+salesTotals?.totalAmount - +batchTotals?.totalPrice)

    return {
        selectedPeriod: monthYear ? `Month: ${monthYear}` : "All Time",
        totalEggs: batchTotals.totalEggs,
        totalPrice: batchTotals.totalPrice,
        quantitySold: salesTotals.quantitySold,
        totalAmount: salesTotals.totalAmount,
        salesProfit: profit > 0 ? `Profit: [${profit}]` : `Loss: [${profit}]`
    };
}