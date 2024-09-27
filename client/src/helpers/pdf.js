import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { convertDateToUIFormat } from './dateConversion.js';
import { formatToMoney } from './priceDisplayConversion.js';

export const generatePDF = ({ recievedBatch, incubationArray, hatchArray, salesArray, reportForSeptember }) => {

    const doc = new jsPDF();

    doc.text('Reports Document', 16, 10);
    doc.text('Generated on ' + `${convertDateToUIFormat(new Date())}` + ' at ' + `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, 12, 20);

    {
        recievedBatch && recievedBatch.length > 0 && doc.text('Farmer Collection Records', 12, 35);
        recievedBatch && recievedBatch.length > 0 && doc.autoTable({
            head: [['First Name', 'Last Name', 'Email', 'Received Date', 'Total Eggs', 'Total Amount', 'Batch Status']],
            body: recievedBatch.map(record => [
                record.firstName,
                record.lastName,
                record.userEmail,
                new Date(record.receivedDate).toLocaleDateString(),
                record.totalEggs,
                record.totalPrice,
                record.batchStatus,
            ]),
            startY: 40
        });
    };

    {
        incubationArray && incubationArray.length > 0 && doc.text('Incubation Records', 12, doc.lastAutoTable.finalY + 10 || 35);
        incubationArray && incubationArray.length > 0 && doc.autoTable({
            head: [['Start Date', 'Hatch Date', 'Total Eggs', 'Incubation State']],
            body: incubationArray.map(record => [
                new Date(record.startDate).toLocaleDateString(),
                new Date(record.hatchDate).toLocaleDateString(),
                record.totalEggs,
                record.incubationState,
            ]),
            startY: doc.lastAutoTable.finalY + 16 || 40
        });
    };

    {
        hatchArray && hatchArray.length > 0 && doc.text('Hatch Records', 14, doc.lastAutoTable.finalY + 10 || 35);
        hatchArray && hatchArray.length > 0 && doc.autoTable({
            head: [['Hatch Date', 'Hatched Chicks', 'Unhatched Eggs']],
            body: hatchArray.map(record => [
                new Date(record.dateHatched).toLocaleDateString(),
                record.hatchedChicks,
                record.unHatchedEggs,
            ]),
            startY: doc.lastAutoTable.finalY + 16 || 40
        });
    };

    {
        salesArray && salesArray.length > 0 && doc.text('Sales Records', 14, doc.lastAutoTable.finalY + 10 || 35);
        salesArray && salesArray.length > 0 && doc.autoTable({
            head: [['Sale Date', 'Quantity Sold', 'Price', 'Total Amount']],
            body: salesArray.map(record => [
                new Date(record.saleDate).toLocaleDateString(),
                record.quantitySold,
                record.price,
                record.totalAmount,
            ]),
            startY: doc.lastAutoTable.finalY + 16 || 40
        });
    }

    {
        reportForSeptember && doc.text('Profits Reports', 14, doc.lastAutoTable.finalY + 10 || 35);
        reportForSeptember && doc.autoTable({
            head: [['Period', 'Total Eggs Bought', 'Total Eggs Buying Price', 'Quantity of Sold Chicks', 'Total Chicks Sold Amount','Profit/Loss']],
            body: [[
                reportForSeptember?.selectedPeriod,
                reportForSeptember?.totalEggs,
                formatToMoney(reportForSeptember?.totalPrice),
                reportForSeptember?.quantitySold,
                formatToMoney(reportForSeptember?.totalAmount),
                reportForSeptember?.salesProfit
            ]],
            startY: doc.lastAutoTable.finalY + 16 || 40
        });
    }

    doc.save('records.pdf');
};