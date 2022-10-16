//sheet id :
//1_19kUNTJ-RLKVtkGJsGW1JC53-a46zc5Iif26M6tRzE
//form id
//1m0YhRowP25_Z9c_5AvSYwsjwcDG0tJXuGExFKuZgTQ8

// Import dependencies

// Import dependencies
const fs = require("fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("./credentials.json");

// Configure auth client
const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

(async function () {
    try {

        // Authorize the client
        const token = await authClient.authorize();

        // Set the client credentials
        authClient.setCredentials(token);

        // Get the rows
        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: "1wruTWOU5ks5cB-zpXtt_bQV-Ob91xhRTaragQQ9eI5s",
            range: "B:J",
        });

        // All of the answers
        const answers = [];

        // Set rows to equal the rows
        const rows = res.data.values;

        // Check if we have any data and if we do add it to our answers array
        if (rows.length) {

            // Remove the headers
            rows.shift()

            // For each row
            for (const row of rows) {
                answers.push({ Name: row[0], email: row[1] , cf: row[6] , vj : row[7], committe : row[8]});
            }

        } else {
            console.log("No data found.");  
        }

        // Saved the answers
        fs.writeFileSync("answers.json", JSON.stringify(answers), function (err, file) {
            if (err) throw err;
            console.log("Saved!");
        });

    } catch (error) {

        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);

    }

})();