import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function Subscription() {
  const { user, updateUser } = useContext(AuthContext);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (user) {
      setIsPremium(user.isSubscribed);
    }
  }, [user]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById("razorpay-script");
      if (existingScript) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user) {
      alert('Please login first');
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const orderRes = await axios.post(`${apiUrl}/api/subscription/create-order`);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_STXzPHIbayB1EE861gtKdWTPTDcfXzkN2SFvCa",
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        order_id: orderRes.data.id,
        name: "IPL Predictor Premium",
        description: "Premium subscription ₹499",
        handler: async function (response) {
          try {
            await axios.post(`${apiUrl}/api/subscription/verify-payment`, {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
            setIsPremium(true);
            updateUser({ ...user, isSubscribed: true });
            alert("Payment Successful! You are now premium.");
            // Update user context
            user.isSubscribed = true;
          } catch (err) {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Failed to create order.");
    }
  };

  return (
    <div className="subscription">
      <h2>🔥 Premium Access</h2>
      {user ? (
        isPremium ? (
          <>
            <p>You are a premium user. Access all prediction tools and detailed analytics.</p>
            <p>Benefit: Ad-free lobby + priority prediction emails</p>
          </>
        ) : (
          <>
            <p>Subscribe for exclusive IPL forecasts, AI-based player picks, and weekly trends.</p>
            <button className="btn btn-primary" onClick={handlePayment}>
              Subscribe ₹499
            </button>
          </>
        )
      ) : (
        <p>Please <a href="/login">login</a> to subscribe.</p>
      )}
    </div>
  );
}