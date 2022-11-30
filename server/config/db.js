const mongoose = require("mongoose");

const connection = () => {
    try {
        mongoose.connect(process.env.Mongo_URI, () => {
            console.log("Successful Connected");
        })
    } catch (error) {
        console.log("Error Occuredd");
    }
}

module.exports = connection;