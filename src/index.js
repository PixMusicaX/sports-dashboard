import express from 'express';
import { matchRouter } from "./routes/matches.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running using ES Modules!"
    });
});

// FIX: Use app.use() instead of app.get() to mount routers
app.use('/matches', matchRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});