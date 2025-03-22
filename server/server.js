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

// Allow multiple origins
const allowedOrigins = ["http://localhost:5174", "http://localhost:5174/", ""];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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


