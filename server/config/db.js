import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log("Mongodb connected...");
          
    } catch (error) {
        console.error(error);    
    }
}

export default connectDB;