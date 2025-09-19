import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BDOMAIN}sir/reset`,
        { password1, password2 }, // body
        {
          withCredentials: true, // send cookies/session
          headers: {
            "Content-Type": "application/json", // optional, axios auto-sets for JSON
          },
        }
      );

      toast.success(res.data?.message || "Password changed successfully.");
      navigate("/me");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password reset failed. Try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

        <label className="block mb-2 text-sm font-medium">New Password</label>
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <label className="block mb-2 text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
