const express = require("express");
const dotenv = require("dotenv")
const app = express();
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/erromiddle");
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
    res.send("Hello")
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server start at 5000");
})
