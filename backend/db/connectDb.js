import mongoose from "mongoose";
import { DB_NAME } from "./DB_NAME.js";


const connectDB = async () => {
    try {
        console.log('this is dbName', DB_NAME)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB conncetion error smarth ", error)
        process.exit(1)
    }
}

export default connectDB