import express from 'express'
import { listOrders, placeOrder, usersOrder, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRoute = express.Router();

orderRoute.post('/place', authMiddleware, placeOrder);
orderRoute.post('/verify', verifyOrder);
orderRoute.post('/userorders', authMiddleware, usersOrder);
orderRoute.get('/list',listOrders );

export default orderRoute;