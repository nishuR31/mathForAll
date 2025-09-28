import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import { toast } from "sonner";
import axios from "axios";

const LoginPage = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    "emailUser": "",
    "password": "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      // Replace with your actual login API endpoint
      const res = await axios.post(
        `${import.meta.env.VITE_BDOMAIN}sir/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = res.data;

      if (!data.success) {
        toast.error(data.message);
      }

      toast.success(data.message);
      navigate("/me");
      console.log("Login success:", data);

      // Save token in localStorage / cookies and redirect as needed
    } catch (err) {
      toast.error(`Error:${err.message}`);
      console.error(`Error:${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-muted/30">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Icon name="Lock" size={32} className="text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-card-foreground">Login</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Please log in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Email Address or Username
            </label>
            <input
              id="emailUser"
              name="emailUser"
              type="text"
              required
              value={formData.emailUser}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            iconName={loading ? "Loader" : "LogIn"}
            iconPosition="left"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Don’t have an account{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register?
            </Link>
          </p>
          <p className="mt-2">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Password Forgot?
            </Link>
          </p>
          <p className="mt-2">
            Password less ?{" "}
            <Link to="/password-less" className="text-primary hover:underline">
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
      </div>
    </section>
  );
};

export default LoginPage;
