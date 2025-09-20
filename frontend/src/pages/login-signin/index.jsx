import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Checking for permission...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      toast.warning("Permission required.");
      navigate("/access");
    }, 3000);

    return () => clearTimeout(timer); // cleanup if user leaves early
  }, [navigate]);

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
