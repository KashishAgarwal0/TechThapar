import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // Email passed from Register

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Please enter OTP");

    setLoading(true);
    try {
      const res = await fetch("/api/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "OTP verification failed");
      }

      const data = await res.json();
      setMessage("OTP verified successfully! Redirecting...");
      setTimeout(() => navigate("/auth"), 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F85C46] to-[#1d1d21] text-white">
      <div className="bg-[#1d1d21] p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#F85C46]">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <p className="text-center mb-6 text-gray-300">
          We have sent an OTP to <span className="text-[#F85C46]">{email}</span>
          .
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-[#F85C46] bg-transparent text-white p-3 rounded-md text-center text-xl tracking-widest"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F85C46] text-white py-3 rounded-md hover:bg-[#e44e3b] transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}
