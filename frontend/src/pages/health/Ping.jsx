import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import { Helmet } from "react-helmet";
import Icon from "../../components/AppIcon";

export default function Ping() {
  const [ping, setPing] = useState({ message: "Fetching...", success: null });
  const [health, setHealth] = useState({
    message: "Fetching...",
    success: null,
  });
  const [time, setTime] = useState(new Date().toLocaleString());

  // Fetch ping and health
  const fetchStatus = async () => {
    // --- Ping ---
    try {
      const pingRes = await axios.get(
        `${import.meta.env.VITE_BDOMAIN}info/ping`
      );
      setPing(
        pingRes.data.success
          ? pingRes.data
          : { message: "Sink", success: false }
      );
      if (!pingRes.data.success) {
        toast.error(pingRes.data.message || "Ping failed.");
      }
    } catch (err) {
      setPing({ message: "Sink", success: false });
      toast.error("Ping request failed.");
    }

    // --- Health ---
    try {
      const healthRes = await axios.get(
        `${import.meta.env.VITE_BDOMAIN}info/health`
      );
      setHealth(
        healthRes.data.success
          ? healthRes.data
          : { message: "Ill", success: false }
      );
      if (!healthRes.data.success) {
        toast.error(healthRes.data.message || "Health check failed.");
      }
    } catch (err) {
      setHealth({ message: "Ill", success: false });
      toast.error("Health request failed.");
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
      fetchStatus();
    }, 1000 * 60 * 15); // refresh every 15 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Home Dashboard - Mathematics for All</title>
        <meta
          name="description"
          content="Welcome to Mathematics for All - your gateway to free mathematics education."
        />
      </Helmet>

      <div className="transition-all min-h-screen bg-foreground text-primary flex flex-col items-center justify-center px-6 py-10 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl animate-bounce font-bold bg-gradient-to-tl from-primary via-muted to-primary bg-clip-text text-transparent">
            System Health Monitor
          </h1>
          <p className="text-muted-foreground text-lg">
            Live overview of backend uptime and system status
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full min-w-screen">
          <StatusCard title="Current Time" content={time} />
          <StatusCard
            title="Backend Status"
            content={health.message}
            success={health.success}
          />
          <StatusCard
            title="Ping Status"
            content={ping.message}
            success={ping.success}
          />

          <div className="bg-transparent rounded-2xl shadow-lg p-6 border border-secondary hover:border-accent md:col-span-2">
            <h2 className="text-xl font-semibold text-secondary mb-2">
              Metadata
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-secondary">
              <li>Version: 1.0.0</li>
              <li>Environment: Production</li>
            </ul>
          </div>

          <div className="flex flex-wrap  flex-row justify-around">
            <a href="/" className="text-card hover:underline">
              <Button
                variant="ghost"
                size="lg"
                className="hover:bg-success bg-secondary"
              >
                <Icon name={"Home"} size={20} />{" "}
                <p className="hidden sm:block pl-5">Go Home</p>
              </Button>
            </a>

            <a
              href="https://github.com/nishuR31"
              target="_blank"
              rel="noreferrer"
              className="text-card hover:underline"
            >
              <Button
                variant="ghost"
                size="lg"
                className="hover:bg-success bg-secondary"
              >
                <Icon name={"Github"} size={20} />{" "}
                <p className="hidden sm:block pl-5">Github</p>
              </Button>
            </a>
          </div>
        </div>

        <footer className="max-w-2xl text-center text-sm text-muted-foreground pt-6 border-t border-primary">
          <p>
            Disclaimer: This page is for monitoring and transparency purposes.
            Data refreshes automatically.
          </p>
        </footer>
      </div>
    </>
  );
}

function StatusCard({ title, content, success }) {
  return (
    <div className="bg-transparent rounded-2xl shadow-lg p-6 border border-muted-foreground hover:shadow-xl transition">
      <h2
        className={`text-xl font-semibold mb-2 flex items-center gap-2 ${
          success === true
            ? "text-success"
            : success === false
            ? "text-destructive"
            : "text-warning"
        }`}
      >
        {title}
        {success === true && <Icon name="Check" />}
        {success === false && <Icon name="X" />}
      </h2>
      <p className="break-words text-primary-foreground text-sm">{content}</p>
    </div>
  );
}
