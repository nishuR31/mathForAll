import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PasswordLessPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // GET request to trigger password-less email
      const res = await axios.get(
        `${import.meta.env.VITE_BDOMAIN}sir/password-less-mail`,
        {
          params: { email }, // pass email as query parameter
        }
      );

      toast.success(res.message);
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Failed to send login link";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-card border border-border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Password-less Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Login Link"}
        </button>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
          <p className="mt-2">
            Remember Password ?{" "}
            <Link to="/login" className="text-primary hover:underline">
              login
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/" className="text-primary hover:underline">
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
    </div>
  );
};

export default PasswordLessPage;
