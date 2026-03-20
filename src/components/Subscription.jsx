export default function Subscription() {

  const handlePayment = () => {
       const options = {
      key: "rzp_test_STXzPHIbayB1EE,861gtKdWTPTDcfXzkN2SFvCa",
      amount: 499,
      currency: "INR",
      name: "IPL Predictor",
      description: "Premium Subscription",

      handler: function () {
        alert("Payment Successful!");
        localStorage.setItem("premium", "true");
        window.location.reload();
      },
      prefill: {
      name: "User",
      email: "test@test.com",
      contact: "9999999999",
    },

    theme: {
      color: "#22c55e",
    },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="subscription">
      <h2>🔥 Premium Access</h2>
      <p>Get winning predictions</p>

      <button className="btn btn-primary" onClick={handlePayment}>
        Subscribe ₹499
      </button>
    </div>
  );
}