import React, { useState, useEffect } from "react";
import CreateMentor from "./MentorForm";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../redux/requestMethods";
const Payment = ({ onClose }) => {
  const [paymentId, setPaymentId] = useState("");
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    // Load Razorpay script when component mounts
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      // Make an API call to create a payment order
      const response = await publicRequest(user.token).post("/payment", {
        amount: 1000,
        currency: "INR",
        receipt: "order_rcptid_11",
        userId: user.id,
      });

      // Log the response to verify data
      console.log("Payment order response:", response);

      // Once you get the payment ID from your server, set it in the state
      setPaymentId(response.data._id);

      // Check if Razorpay is initialized
      if (window.Razorpay) {
        const options = {
          key: "rzp_test_HzvZBX3kKR3CoN",
          amount: 1000,
          currency: "INR",
          name: "TheNextBigThing",
          description: "Purchase Description",
          image: {},
          order_id: response._id,
          handler: function (response) {
            toast.success("Payment successful: " + 123456);
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error("Razorpay SDK not initialized");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error processing payment. Please try again later.");
    }
  };

  const [classCode, setClassCode] = useState("");
  const handleJoinClassroom = () => {
    // Implement your logic to handle joining the classroom
    // You can use the classCode and navigate to the corresponding classroom

    console.log("Joining Classroom with Class Code:", classCode);

    onClose();
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center fixed inset-0 bg-blue-200 bg-opacity-30 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-96 h-72 shadow p-4 relative">
            <button onClick={onClose} className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#7959FD"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={handlePayment}
              className="border-2 bg-sky-400 rounded-3xl text-white font-bold p-2"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
