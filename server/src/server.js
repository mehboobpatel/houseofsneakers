require('dotenv').config(); // Load variables from .env file

const app = require("./index");

const connect = require("./configs/db");

const port = process.env.PORT || 8080;
const MONGODB_URI = "mongodb+srv://trentboult446:twxgHizzI6MnAtSc@cluster0.szzu4qt.mongodb.net/?retryWrites=true&w=majority";

app.listen(port, async () => {
    await connect(MONGODB_URI);
    console.log(`Listening to port ${port}`);
});
