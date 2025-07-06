import  Mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
    try {
        const conn = await Mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default connection;
