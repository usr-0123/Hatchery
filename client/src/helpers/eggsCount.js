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