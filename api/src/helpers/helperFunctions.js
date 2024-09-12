export const formatNameCase = (params) => {
    if (params) {
        let formattedName = params.charAt(0).toUpperCase() + params.slice(1).toLowerCase();
        return formattedName;
    };
    
    return params;
};

export const convertDateToISO = (dateString) => {
    let date = new Date(dateString).toISOString();
    return date = new Date(date);
};

export const convertToSimpleDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const paginate = (data, req, res) => {
    /**
     * Paginates array of data
     * @param data (array)
     * @param req (any)
     * @param res (any) 
     */
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    };

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    };

    results.results = data.slice(startIndex, endIndex);
    res.stsus(200).json(results);
};

export const orderData = (data, order) => {
    /**
     * Order data either in the ascending or descending order
     * @param data (array)
     * @param order (string && allow('asc' || 'desc'))
     */
    if (order === 'asc') {
        return data.sort((a,b) => a.id - b.id);
    } else if (order === 'desc') {
        return data.sort((a,b) => b.id - a.id);
    };
}