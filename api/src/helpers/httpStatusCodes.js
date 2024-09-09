export const successMessage = (res, message) => {
    /**
     *  Request successful
     * @param res (any)
     * @param message (String)
     */

    return res.status(200).json({ Message: message });
};

export const dataFound = (res, data, message) => {
    /**
     * When data has been successfully been fetched, 
     * and we have to return the data.
     * @param res (any)
     * @param data (array)
     * @param message (string)
     */
    return res.status(200).json({ Message: message, data });
};

export const sendDeleteSuccess = (res, message) => {
    /**
     * When a delete request is successfully executed.
     * @param res (any)
     * @param message (string)
     */
    return res.status(200).json({ Message: message });
};

export const sendCreated = (res, message) => {
    /**
     * Successfully created a creation request.
     * @param res (any)
     * @param message (string)
     */
    return res.status(201).json({ Message: message });
};

export const validationError = (res, message) => {
    /**
     * Request validation error
     * @param res (any)
     * @param message (String)
     */
    return res.status(400).json({ Message: message });
};

export const sendBadRequest = (res, message) => {
    /**
     * Request malformed or client error
     * @param res (any)
     * @param message (String)
     */
    return res.status(400).json({ Message: message });
};

export const unAuthorized = (res, message) => {
    /**
     * Authentication is required or failed
     * @param res (any)
     * @param message (String)
     */
    return res.status(401).json({ Message: message });
};

export const forbidden = (res, message) => {
    /**
     * Client lacks access permission to access the resource
     * @param res (any)
     * @param message (String)
     */
    return res.status(403).json({ Message: message });
};

export const sendNotFound = (res, message) => {
    /**
     * Requested resource could not be found.
     * @param res (any)
     * @param message (String)
     */
    return res.status(404).json({ Message: message });
};

export const methodNotAllowed = (res, message) => {
    /**
     * HTTP method used is not supported by the resource
     * @param res (any)
     * @param message (String)
     */
    return res.status(405).json({ Message: message });
};

export const timeOut = (res, message) => {
    /**
     * Server timed out waiting for the request
     * @param res (any)
     * @param message (String)
     */
    return res.status(408).json({ Message: message });
};

export const conflict = (res, message) => {
    /**
     * Request has conflicts
     * @param res (any)
     * @param message (String)
     */
    return res.status(409).json({ Message: message });
};

export const unprocessable_Entity = (res, message) => {
    /**
     * 
     * @param res (any)
     * @param message (String)
     */
    return res.status(422).json({ Message: message })
}

export const sendServerError = (res, message) => {
    /**
     * Server encountered an unexpected condition
     * @param res (any)
     * @param message (String)
     */
    return res.status(500).json({ Message: message })
};

export const notImplemented = (res, message) => {
    /**
     * The server does not recognize the request method
     * @param res (any)
     * @param message (String)
     */
    return res.status(501).json({ Message: message });
};

export const badGateway = (res, message) => {
    /**
     * Server recieved an invalid response from an upstream server.
     * @param res (any)
     * @param message (String)
     */
    return res.status(502).json({ Message: message });
};

export const serviceUnavailable = (res, message) => {
    /**
     * Server is currently unable to handle the request
     * @param res (any)
     * @param message (String)
     */
    return res.status(503).json({ Message: message });
};

export const gatewayTimeout = (res, message) => {
    /**
     * Server acting as a gateway timed out waiting for a response
     * @param res (any)
     * @param message (String)
     */
    return res.status(504).json({ Message: message });
};