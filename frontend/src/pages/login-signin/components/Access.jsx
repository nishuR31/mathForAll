import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Access = () => {
  const [step, setStep] = useState("email"); // 'email' | 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const navigate = useNavigate();

  // check block info in localStorage
  useEffect(() => {
    const block = JSON.parse(localStorage.getItem("Block"));
    if (block) {
      const now = Date.now();
      if (now < block.expiry) {
        setBlocked(true);
        setCount(5);
      } else {
        localStorage.removeItem("Block");
      }
    }
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (blocked) {
      toast.warn("You are blocked for 1 Day.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BDOMAIN}sir/forgot`, { email });
      toast.success("OTP sent to email!");
      setStep("otp");
      setCount(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (blocked) return;

    const attempts = count + 1;
    setCount(attempts);

    if (attempts > 5) {
      toast.error("Maximum attempts reached. Access blocked for 1 day.");
      setBlocked(true);
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("Block", JSON.stringify({ expiry }));
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BDOMAIN}sir/otp`, {
        email,
        otp,
      });
      toast.success("OTP verified! Redirecting...");
      navigate("/me");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
      setOtp("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-purple-900">
      {/* Blurred glowing blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 max-w-md w-full p-6 bg-card border border-border rounded-lg shadow-xl backdrop-blur-lg">
        {blocked ? (
          <p className="text-center text-red-500 font-bold">
            You have been blocked due to reaching the maximum OTP attempts. Try
            again later.
          </p>
        ) : step === "email" ? (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="text-xl font-bold mb-4 text-center text-primary">
              Sir Login
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-border rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <div className="flex flex-wrap flex-row justify-between">
              <p className="mt-2 text-center">
                <Link
                  to="/"
                  onClick={() => {
                    navigate("/");
                    toast.success("Back to previous page.");
                  }}
                  className="text-primary hover:underline"
                >
                  Home Page?
                </Link>
              </p>
              <p
                className="mt-2 hover:underline text-center"
                onClick={() => {
                  window.history?.back();
                  toast.success("Back to previous page.");
                }}
              >
                Go Back?
              </p>
              <p
                className="mt-2 hover:underline text-center"
                onClick={() => {
                  navigate("/login");
                  toast.success("Back to previous page.");
                }}
              >
                Login?
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <h2 className="text-xl font-bold mb-4 text-center text-white">
              Enter OTP
            </h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-border rounded mb-4 bg-background text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="text-sm text-gray-400 mt-2 text-center">
              Attempts left: {5 - count > 0 ? 5 - count : 0}
            </p>
            <div className="flex flex-wrap flex-row justify-between">
              <p className="mt-2 text-center">
                <Link
                  to="/"
                  onClick={() => {
                    window.history?.back();
                    toast.success("Back to previous page.");
                  }}
                  className="text-primary hover:underline"
                >
                  Home Page?
                </Link>
              </p>
              <p
                className="mt-2 hover:underline text-center"
                onClick={() => {
                  window.history?.back();
                  toast.success("Back to previous page.");
                }}
              >
                Go Back?
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Access;
