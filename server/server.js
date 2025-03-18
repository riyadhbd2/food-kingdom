import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';

const app = express();

const port = 6006;

// middle ware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoint

app.use('/api/food', foodRouter);


app.get('/', (req, res)=>{
    res.send("api working")
})

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
})


