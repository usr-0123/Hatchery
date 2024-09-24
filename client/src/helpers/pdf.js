import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = ({ farmerRecords, incubationRecords, hatchRecords }) => {
    const doc = new jsPDF();

    {
        farmerRecords.length > 0 && doc.text('Farmer Collection Records', 14, 10);
        farmerRecords.length > 0 && doc.autoTable({
            head: [['First Name', 'Last Name', 'Email', 'Received Date', 'Total Eggs', 'Batch Status']],
            body: farmerRecords.map(record => [
                record.firstName,
                record.lastName,
                record.userEmail,
                new Date(record.receivedDate).toLocaleDateString(),
                record.totalEggs,
                record.batchStatus,
            ]),
            startY: 20
        });
    };

    {
        incubationRecords.length > 0 && doc.text('Incubation Records', 14, doc.lastAutoTable.finalY + 10);
        incubationRecords.length > 0 && doc.autoTable({
            head: [['Start Date', 'Hatch Date', 'Total Eggs', 'Incubation State']],
            body: incubationRecords.map(record => [
                new Date(record.startDate).toLocaleDateString(),
                new Date(record.hatchDate).toLocaleDateString(),
                record.totalEggs,
                record.incubationState,
            ]),
            startY: doc.lastAutoTable.finalY + 20
        });
    };

    {
        hatchRecords.length > 0 && doc.text('Hatch Records', 14, doc.lastAutoTable.finalY + 10);
        hatchRecords.length > 0 && doc.autoTable({
            head: [['Hatch Date', 'Hatched Chicks', 'Unhatched Eggs']],
            body: hatchRecords.map(record => [
                new Date(record.dateHatched).toLocaleDateString(),
                record.hatchedChicks,
                record.unHatchedEggs,
            ]),
            startY: doc.lastAutoTable.finalY + 20
        });
    }

    doc.save('records.pdf');
};