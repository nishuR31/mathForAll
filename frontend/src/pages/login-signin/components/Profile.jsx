import Icon from "../../../components/AppIcon";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/ui/Button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BDOMAIN}sir/me`, {
          withCredentials: true,
        });
        const userData = res?.data?.payload;

        if (!res.data.success) {
          navigate("/login");
          return;
        }

        setUser(userData.user);
        toast.success("Welcome sir.");
      } catch (err) {
        console.error(err);
        toast.error("Not logged in. Please login.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BDOMAIN}sir/logout`, {
      withCredentials: true,
    });

    if (!res.data?.success) toast.error(res.data?.message);

    navigate("/");
    toast.success("You are logged out sir.");
  };

  const handleDel = async () => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BDOMAIN}sir/del`,
      {
        withCredentials: true,
      }
    );

    if (!res.data?.success) toast.error(res.data?.message);

    navigate("/");
    toast.success("Account deletion done.");
  };

  const handleVideos = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BDOMAIN}info/refresh/videos`,
      { withCredentials: true }
    );
    if (!res.data?.success) toast.error(res.data?.message);
    toast.success("Videos are refreshed..");
  };

  const handleChannel = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BDOMAIN}info/refresh/channel`,
      { withCredentials: true }
    );
    if (!res.data?.success) toast.error(res.data?.message);
    toast.success("Channel is refreshed..");
  };

  const handleReset = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BDOMAIN}sir/reset`, {
      withCredentials: true,
    });
    if (!res.data?.success) toast.error(res.data?.message);

    navigate("/me");
    toast.success("Password Reset successfully.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      console.table({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      const res = await axios.patch(
        `${import.meta.env.VITE_BDOMAIN}sir/update`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        { withCredentials: true }
      );
      setMessage(res.data?.message || "Profile updated successfully!");
      toast.success(res.data?.message || "Profile updated!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Failed to update profile";
      setMessage(errMsg);
      toast.error(errMsg);
    }
  };

  if (loading)
    return (
      <p className="text-center text-muted-foreground p-6 text-lg animate-pulse">
        Loading profile...
      </p>
    );

  if (!user)
    return (
      <p className="text-center p-6 text-destructive bg-destructive-foreground text-lg font-semibold">
        No profile found.
      </p>
    );

  return (
    <>
      <div className="w-screen bg-fixed bg-no-repeat bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1] dark:bg-gradient-to-bl dark:from-black dark:via-purple-500 dark:to-pink-500 min-h-screen p-10">
        <div className="w-[95%]  mx-auto p-8 bg-transparent border-muted-foreground rounded-2xl shadow-lg backdrop-blur-md">
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-5  ">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                Edit Profile
              </h2>
              {message && (
                <div className="mb-4 p-3 text-sm text-white bg-primary rounded-lg shadow">
                  {message}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1 rounded-lg"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-lg"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center bg-transparent ">
              <img
                src={"/assets/images/sir.jpg" ?? user.photoUrl}
                alt={user.userName}
                className="w-40 h-40  transition-all delay-5000  hover:w-[50%] hover:rounded-3xl hover:z-100 hover:absolute hover:h-fit rounded-full border-2 border-primary shadow-2xl drop-shadow-2xl object-cover "
              />
              <h1 className="text-3xl font-extrabold text-primary-foreground m-3">
                {user.userName}
              </h1>
              <p className="text-lg text-foreground font-medium">
                {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
              </p>
              <p className="pt-5 text-accent">{user.email}</p>
              <div className="mt-6 text-sm text-card-foreground text-center space-y-1">
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Updated:</span>{" "}
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-8 w-full sm:w-[80%] ">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-xl hover:shadow-3xl hover:bg-secondary hover:drop-shadow-2xl"
                  onClick={() => setEditMode(true)}
                >
                  <Icon
                    name="SquarePen"
                    size={24}
                    className="text-accent-foreground hidden md:block hover:animate-pulse"
                  />
                  <p className="pl-2 ">Edit Profile</p>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-xl hover:shadow-3xl hover:bg-warning hover:drop-shadow-2xl"
                  onClick={handleReset}
                >
                  <Icon
                    name="Settings"
                    size={24}
                    className="text-accent-foreground hidden md:block hover:animate-spin"
                  />
                  <p className="pl-2 ">Reset Password</p>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-xl hover:shadow-3xl hover:bg-primary  hover:drop-shadow-2xl"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <Icon
                    name="Home"
                    size={24}
                    className="text-accent-foreground hidden md:block  hover:animate-pulse"
                  />
                  <p className="pl-2 ">Home</p>
                </Button>

                <div className="flex flex-wrap flex-row justify-around">
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl hover:shadow-3xl hover:bg-success  hover:drop-shadow-2xl w-1/2"
                    onClick={handleVideos}
                  >
                    <Icon
                      name="RefreshCw"
                      size={24}
                      className="text-accent-foreground hidden md:block  hover:animate-spin "
                    />
                    <p className="pl-2 ">Refresh Videos</p>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl hover:shadow-3xl hover:bg-success hover:drop-shadow-2xl w-1/2"
                    onClick={handleChannel}
                  >
                    <Icon
                      name="RefreshCw"
                      size={24}
                      className="text-accent-foreground hidden md:block  hover:animate-spin"
                    />
                    <p className="pl-2 ">Refresh Channel</p>
                  </Button>
                </div>
                <div className="flex flex-wrap  flex-row justify-around">
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl hover:shadow-3xl hover:bg-destructive hover:drop-shadow-2xl w-1/2"
                    onClick={handleLogout}
                  >
                    <Icon
                      name="LogOut"
                      size={24}
                      className="text-accent-foreground hidden md:block  hover:animate-pulse"
                    />
                    <p className="pl-2 ">Logout</p>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl hover:shadow-3xl hover:bg-destructive hover:drop-shadow-2xl w-1/2"
                    onClick={handleDel}
                  >
                    <Icon
                      name="Trash"
                      size={24}
                      className="text-accent-foreground hidden md:block  hover:animate-pulse"
                    />
                    <p className="pl-2 ">Delete Account</p>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
