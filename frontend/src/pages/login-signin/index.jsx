import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // assuming you’re using react-toastify

const Me = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Checking for existing profile...");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BDOMAIN}sir/me`,
          { withCredentials: true, validateStatus: () => true } // prevent axios from throwing on 401
        );

        if (res.success ) {
          setMsg("Existing Profile found, redirecting to profile.");
          toast.success("Profile found, redirecting to profile");
          setTimeout(() => navigate("/me"), 5000);
        } else {
          setMsg("No existing profile found, redirecting to login.");
          toast.error("Profile not found, redirecting to login");
          setTimeout(() => navigate("/login"), 5000);
        }
      } catch (err) {
        console.log("Error checking session, redirecting to login");
        setMsg("Error checking session, redirecting to login.");
        toast.error("Error checking session, redirecting to login");
        setTimeout(() => navigate("/login"), 5000);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Mathematics for All
      </h1>
      <hr className="my-6 w-full max-w-md" />
      <h1 className="text-xl font-semibold">{msg}</h1>
    </div>
  );
};

export default Me;
