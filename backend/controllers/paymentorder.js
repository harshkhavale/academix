import PaymentOrder from '../models/paymentorder.js';

export const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, userId } = req.body;

    const paymentOrder = new PaymentOrder({
      amount,
      currency,
      receipt,
      userId,
    });
    const response = await paymentOrder.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

