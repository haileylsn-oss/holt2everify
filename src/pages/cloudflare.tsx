import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChallengePage = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => {
        navigate("/verify");
      }, 2000); // Wait for 2 seconds after verification before routing
      return () => clearTimeout(timer);
    }
  }, [verified, navigate]);

  const handleCheckboxChange = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true); // Simulate successful verification
    }, 2000); // Simulate delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Complete the Challenge
        </h2>
        <p className="text-gray-700 mb-6">
          Please complete the anti-bot challenge to proceed.
        </p>

        <div className="border flex justify-between fborder-gray-300 rounded-md p-4 w-full">
          <div className="flex  justify-center items-center space-x-4">
            <input
              type="checkbox"
              disabled={loading || verified}
              checked={verified}
              onChange={handleCheckboxChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-800">
              {loading ? "Verifying..." : verified ? "Verified!" : "I'm human"}
            </span>
          </div>

          <div className=" flex  justify-center">
            <img
              src="data:image/png;base64,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"
              className="h-[100px] w-[100px]"
            
            />
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          <a href="#" className="hover:underline">
            Privacy
          </a>{" "}
          •{" "}
          <a href="#" className="hover:underline">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
