const express = require('express');
const app = express();
const PORT = 8000;

// JSON Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running!"
    });
});

// Start the server and log the URL
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});