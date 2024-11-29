const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(res => {
                // console.log(res)
                console.log(("DB Connected"));
            })
    } catch (error) {
        console.log("error database")
    }
}

module.exports = { connectDB }