const { useState } = React;
const motion = (window.framerMotion && window.framerMotion.motion) || {}; // fallback if not loaded

function HousePricePredictor() {
  const [inputs, setInputs] = useState({ RM: "", LSTAT: "", PTRATIO: "" });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const url = "http://localhost:5000/predict";
      console.log("Fetching:", url); // Debugging output
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();
      console.log("API response:", data); // Debugging output
      if (res.ok && data.predicted_price !== undefined) {
        setPrediction(data.predicted_price.toFixed(2));
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Unexpected error occurred.");
      }
    } catch (err) {
      console.error("Fetch error:", err); // Debugging output
      setError("Could not connect to backend. Make sure your Flask server is running and accessible at http://localhost:5000.");
    }
    setLoading(false);
  };

  // Use plain divs if motion is not available
  const MotionDiv = motion.div || "div";

  // Add a mapping for field labels
  const fieldLabels = {
    RM: "Average Number of Rooms (RM)",
    LSTAT: "Lower Status Population (%) (LSTAT)",
    PTRATIO: "Pupil-Teacher Ratio (PTRATIO)"
  };

  return (
    React.createElement(MotionDiv, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4"
    },
      React.createElement("h2", { className: "text-2xl font-bold text-center" }, "House Price Predictor"),
      React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
        ["RM", "LSTAT", "PTRATIO"].map(field => (
          React.createElement("div", { key: field },
            React.createElement("label", { className: "block mb-1 font-medium" }, fieldLabels[field]),
            React.createElement("input", {
              type: "number",
              name: field,
              value: inputs[field],
              onChange: handleChange,
              required: true,
              className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            })
          )
        )),
        React.createElement("button", {
          type: "submit",
          className: "w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        }, loading ? "Predicting..." : "Predict Price")
      ),
      error && React.createElement(MotionDiv, {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", stiffness: 260, damping: 20 },
        className: "text-center text-xl font-semibold text-red-600"
      }, error),
      prediction && React.createElement(MotionDiv, {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", stiffness: 260, damping: 20 },
        className: "text-center text-xl font-semibold text-green-600"
      }, `Predicted Price: $${prediction}k`)
    )
  );
}
