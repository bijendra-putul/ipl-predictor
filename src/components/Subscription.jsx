import { useState, useEffect } from "react";

export default function Subscription() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    setIsPremium(localStorage.getItem("premium") === "true");
  }, []);

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
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_STXzPHIbayB1EE861gtKdWTPTDcfXzkN2SFvCa",
      amount: 49900,
      currency: "INR",
      name: "IPL Predictor Premium",
      description: "Premium subscription ₹499",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          localStorage.setItem("premium", "true");
          setIsPremium(true);
          alert("Payment Successful! You are now premium.");
        } else {
          alert("Payment not completed. Please try again.");
        }
      },
      prefill: {
        name: "IPL User",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#22c55e",
      },
      modal: {
        ondismiss: function () {
          alert("Payment window closed. Subscription not activated.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="subscription">
      <h2>🔥 Premium Access</h2>
      {isPremium ? (
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
      )}
    </div>
  );
}