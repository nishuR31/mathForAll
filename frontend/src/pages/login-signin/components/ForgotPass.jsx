import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Step 1: request OTP
  const handleRequestOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BDOMAIN}sir/forgot`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  // Step 2: verify OTP
  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BDOMAIN}sir/otp`,
        { email, otp },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("OTP verified");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  // Step 3: change password
  const handleChangePassword = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BDOMAIN}sir/change-pass`,
        { email, password: newPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Password changed successfully");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="pt-[50px] ">
    <div className="m-2 max-w-md mx-auto  p-6 bg-card border rounded-lg shadow ">
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-row flex-wrap justify-center">
            <button
              onClick={handleRequestOtp}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Send OTP
            </button>
            <p className="mt-2">
              <Link to="/" className="text-primary hover:underline">
                Home Page?
              </Link>
            </p>
            <p className="mt-2">
              <Link to="/" className="text-primary hover:underline">
                Home Page?
              </Link>
            </p>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-2 rounded mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />{" "}
          <div className="flex flex-row flex-wrap justify-center">
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Verify OTP
            </button>
            <p className="mt-2">
              <Link to="/" className="text-primary hover:underline">
                Home Page?
              </Link>
            </p>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-bold mb-4">Set New Password</h2>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />{" "}
          <div className="flex flex-row flex-wrap justify-center">
            <button
              onClick={handleChangePassword}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Change Password
            </button>

            <p className="mt-2">
              <Link to="/" className="text-primary hover:underline">
                Home Page?
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;
