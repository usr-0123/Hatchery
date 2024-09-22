import { alertService } from "./alert.js";

const { showAlert } = alertService();

export const copyToClipboard = async (value) => {
    navigator.clipboard.writeText(value)
        .then(() => {
            showAlert('Clipboard Success', 'Item copied to clipboard succesfuly', 'success');
        })
        .catch((err) => {
            showAlert('Clipboard Error', 'Failed to copy.', 'error');
        });
}