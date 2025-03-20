import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';

const app = express();

const port = 6006;

// middle ware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoint
app.use('/api/food', foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);


app.get('/', (req, res)=>{
    res.send("api working")
})

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
})


