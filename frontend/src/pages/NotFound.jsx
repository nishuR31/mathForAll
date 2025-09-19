import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/ui/Button";
import Icon from "components/AppIcon";

const NotFound = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState(15);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 15000);

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">
          Page Not Found
        </h2>
        <p className="text-onBackground/70 mb-8">
          The page you're looking for doesn't exist. Let's get you back
          automatically in {time}s!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            icon={<Icon name="ArrowLeft" />}
            iconPosition="left"
            onClick={() => {
              window.history?.back();
              toast.success("Back to previous page.");
            }}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            icon={<Icon name="Home" />}
            iconPosition="left"
            onClick={() => {
              handleGoHome();
              toast.success("Back to Home.");
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
