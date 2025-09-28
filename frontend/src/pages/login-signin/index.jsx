import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Checking for permission...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BDOMAIN}sir/me`, {
          withCredentials: true,
        });

        if (!res.data.success) {
          toast.warning("Permission required.");
          navigate("/access");
          return;
        }

        toast.success("Welcome sir.");
        navigate("/me");
      } catch (err) {
        console.error(err);
        toast.error("Not logged in. Please login.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      toast.warning("Checking permissions");
      init();
    }, 3000); // keep if intentional delay is desired

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Mathematics for All
      </h1>
      <hr className="my-6 w-full max-w-md" />
      {loading && <h1 className="text-xl font-semibold">{msg}</h1>}
    </div>
  );
};

export default Auth;
