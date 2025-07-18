
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;

console.log("connecting to", url);

mongoose
    .connect(url)
    .then((res) => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err.message);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String,
});

personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    },
});

module.exports = mongoose.model("Person", personSchema);
