export function convertDateToUIFormat(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');

    return `${day} ${month}, ${year}`;
};
