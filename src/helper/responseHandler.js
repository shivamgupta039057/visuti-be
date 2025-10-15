const { default: mongoose } = require('mongoose');
const fs = require('fs');

/**
 * Middleware function to handle responses from controller functions and log requests and responses.
 * @param {Function} controllerFunction - The controller function to be called.
 * @returns {Function} - The middleware function.
 * @throws Will throw an error if the controller function throws one.
 * @throws Will throw a CastError if the error is a mongoose CastError.
 */
module.exports = controllerFunction => async (request, response, next) => {
    try {
        const { statusCode = 200, ...resObj } = await controllerFunction(request, response, next);

        if (response.headersSent) return; // ✅ Ensures no duplicate response
        response.status(+statusCode).json(resObj);
        return; // ✅ Prevents further execution

    } catch (error) {
        if (response.headersSent) return; // ✅ Ensures no duplicate response

        if (error instanceof mongoose.Error.CastError) {
            response.status(400).json({
                status: false,
                message: 'Wrong ID Format',
                data: []
            });
        } else {
            response.status(500).json({
                status: false,
                message: 'Internal server error!',
                data: []
            });
        }
    }
};


/**
 * Logs request and response data to a specified file, and deletes logs from 3 days ago.
 * @param {string} filename - The name of the log file.
 * @param {Error} [error] - The error object if an error occurred during the request.
 * @param {object} request - The request object containing information about the request.
 * @param {object} [response] - The response object containing information about the response.
 * @throws Will throw an error if there is a problem with file operations.
 */
function log(filename, error, request, response) {
    try {
        // Construct the log message
        let msg = `${new Date()}\n${request.method.padEnd(6, ' ')} => ${request.url} - ${new Date().getTime() - request.date.getTime()} ms\nuser: ${JSON.stringify(request.user || {})}\nbody: ${JSON.stringify(request.body)}\nquery: ${JSON.stringify(request.query)}\nparams: ${JSON.stringify(request.params)}\n`;

        // If an error occurred, add the error stack to the log message
        if (error) msg += `error: ${error.stack}\n\n\n`;
        else msg += `response: ${JSON.stringify(response)}\n\n\n`;

        // Construct the log file path
        const folder = `logs/${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}`;

        // Construct the path to the log file from 3 days ago
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 3);
        const oldFolder = `logs/${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

        // If the 'logs' directory does not exist, create it
        if (!fs.existsSync('logs')) fs.mkdirSync('logs');

        // If the log file directory for the current date does not exist, create it
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);

        // Append the log message to the log file
        fs.appendFileSync(`${folder}/${filename}`, msg);

        // If the log file directory for 3 days ago exists, delete it
        if (fs.existsSync(oldFolder)) {
            fs.rmdir(oldFolder, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error occurred while deleting folder:', err);
                }
            });
        }
        // console.log(msg)
    } catch (e) { console.log(e); }
}