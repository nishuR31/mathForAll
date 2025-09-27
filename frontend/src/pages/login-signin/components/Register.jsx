import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import { toast } from "sonner";
import axios from "axios"

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);

  // update form state
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.table(formData)
      const res = await axios.post(
        `${import.meta.env.VITE_BDOMAIN}sir/signup`,
        formData, // this becomes req.body in backend
        {
          headers: {
            "Content-Type": "application/json", // axios sets this by default if sending object
          },
          // withCredentials: true, // if your backend needs cookies
        }
      );

      const data = res.data;
      console.table({data})
      toast.warning(data)

      if (!res.success) {
        toast.error(data?.message || "Registration failed");
      }

      toast.success("Account created successfully!");
      navigate("/login"); // redirect to login page
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/30 px-4 ">
      <div className="w-full max-w-md bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary rounded-xl shadow-elevated p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon name="UserPlus" size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground text-sm">
            Fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3  flex-row flex-wrap ">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className=" flex-1 px-3 py-2 border rounded-lg  bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary "
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-lg  bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary "
              required
            />
          </div>

          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg  bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary "
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg  bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary "
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg  bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary "
            required
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg  bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary "
            required
          />

          <Button
            type="submit"
            variant="default"
            size="lg"
            iconName="LogIn"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
        <p className="text-sm text-muted-foreground text-center mt-2">
          <Link to="/" className="text-primary hover:underline">
            Home Page?
          </Link>
        </p>
        <p
          className="text-sm text-muted-foreground text-center mt-2"
          onClick={() => {
            window.history?.back();
            toast.success("Back to previous page.");
          }}
        >
          Go Back?
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
