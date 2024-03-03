import mongoose from "mongoose";
const paymentOrderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const paymentorder = mongoose.model("PaymentOrder", paymentOrderSchema);

export default paymentorder;
