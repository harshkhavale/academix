import { createOrder } from '../controllers/paymentorder.js';
import express from "express";
const router = express.Router();
router.post("/", createOrder);

export default router;