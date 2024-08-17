const axios = require('axios');

const url = "https://flag-gilt.vercel.app/api/challenge";
const token = "uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA=";
let cursor = "c299142a";

const headers = {
    'Authorization': `Bearer ${token}`
};


let requestCount = 0; // how many request to be sent

// Function to follow the cursor trail
async function followCursor(cursor) {    
        try {            
            requestCount++; // the request counter

            // the data for the POST request
            const response = await axios.post(url, { cursor: cursor }, { headers: headers });

            // Check if the request was successful
            if (response.status === 200) {
                const data = response.data;
                const message = data.message;
                const nextCursor = data.nextCursor;

                console.log(`Request ${requestCount}:`);
                console.log("Message:", message);
                console.log("Next Cursor:", nextCursor);

                // if there's next cursor, call follow cursor
                if (nextCursor) {
                    await followCursor(nextCursor);
                } else {
                    console.log("No more cursors.");
                    console.log(`Total requests: ${requestCount}`);                    
                }
            } else {
                console.error("Unexpected response:", response.status, response.data);                
            }
        } catch (error) {
            console.error("Error during request:", error.message);          
    }
}

followCursor(cursor);