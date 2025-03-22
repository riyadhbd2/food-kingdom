import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();

const port = process.env.PORT || 6006;

// middle ware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoint
app.use('/api/food', foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);


app.get('/', (req, res)=>{
    res.send("api working")
})

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
})


