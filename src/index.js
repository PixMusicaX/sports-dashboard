import express from 'express';

const app = express();
const PORT = 8000;

// JSON Middleware
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running using ES Modules!"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});