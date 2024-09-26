import { batchStatus } from "./globalStrings";

export function getTotalEggsForCurrentMonth(batches) {
    /**
     * Sum up the totalEggs
     * @param batches
     */

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const filteredBatches = batches.filter(batch => {
        const batchDate = new Date(batch.receivedDate);
        return batch.batchStatus === "received" &&
            batchDate.getMonth() === currentMonth &&
            batchDate.getFullYear() === currentYear;
    });

    const totalEggs = filteredBatches.reduce((sum, batch) => sum + batch.totalEggs, 0);

    return totalEggs;
};

export function getTotalEggsAllTime(batches) {
    const filteredBatches = batches.filter(batch => batch.batchStatus === "recieved");

    const totalEggs = filteredBatches.reduce((sum, batch) => sum + batch.totalEggs, 0);

    return totalEggs;
};

export function sumReceivedEggsBatch(batchArray) {
    return batchArray
        .filter(batch => batch.batchStatus === batchStatus.recieved.value)
        .reduce((sum, batch) => sum + batch.totalEggs, 0);
};

export function sumConsumedEggsBatch(eggsArray) {
    return eggsArray
        .reduce((sum, batch) => sum + batch.totalEggs, 0);
};

export function sumSoldChicks(array) {
    return array.reduce((sum, sale) => sum + sale.quantitySold, 0);
};

export function sumSoldChicksRevenue(array) {
    return array.reduce((sum, sale) => sum + sale.totalAmount, 0);
};

export const formatBatchAndSalesDataByMonth = (batches, sales, year) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const dataset = monthNames.map(month => ({
        totalEggs: 0,
        quantitySold: 0,
        month: month
    }));

    const filteredBatches = batches.filter(batch => {
        const receivedYear = new Date(batch.receivedDate).getUTCFullYear();
        return receivedYear === year;
    });

    const filteredSales = sales.filter(sale => {
        const saleYear = new Date(sale.saleDate).getUTCFullYear();
        return saleYear === year;
    });

    filteredBatches.forEach(batch => {
        const receivedDate = new Date(batch.receivedDate);
        const monthIndex = receivedDate.getUTCMonth();

        dataset[monthIndex].totalEggs += batch.totalEggs;
    });

    filteredSales.forEach(sale => {
        const saleDate = new Date(sale.saleDate);
        const monthIndex = saleDate.getUTCMonth();

        dataset[monthIndex].quantitySold += sale.quantitySold;
    });

    return dataset;
};

export const formatSalesDataByMonth = (sales, year) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const dataset = monthNames.map(month => ({
        totalAmount: 0,
        quantitySold: 0,
        month: month
    }));

    const filteredSales = sales.filter(sale => {
        const saleYear = new Date(sale.saleDate).getUTCFullYear();
        return saleYear === year;
    });

    filteredSales.forEach(sale => {
        const saleDate = new Date(sale.saleDate);
        const monthIndex = saleDate.getUTCMonth();

        dataset[monthIndex].totalAmount += sale.totalAmount;
        dataset[monthIndex].quantitySold += sale.quantitySold;
    });

    return dataset;
};

export const formatHatchDataByMonth = (hatchRecords, year) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const dataset = monthNames.map(month => ({
        hatchedChicks: 0,
        unhatchedChicks: 0,
        month: month
    }));

    const filteredHatchRecords = hatchRecords.filter(record => {
        const hatchYear = new Date(record.dateHatched).getUTCFullYear();
        return hatchYear === year;
    });

    filteredHatchRecords.forEach(record => {
        const hatchedDate = new Date(record.dateHatched);
        const monthIndex = hatchedDate.getUTCMonth();

        dataset[monthIndex].hatchedChicks += record.hatchedChicks;
        dataset[monthIndex].unhatchedChicks += record.unHatchedEggs;
    });

    return dataset;
};
