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
        const userData = res?.data?.payload?.user;

        if (!userData) {
          navigate("/login");
          return;
        }

        setUser(userData);
        // navigate("/me");
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

    if (!res.data?.success) {
      toast.error(res.data?.message);
    }
    navigate("/");
    toast.success("You are logged out sir.");
  };

  const handleVideos = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BDOMAIN}info/refresh/videos`,
      {
        withCredentials: true,
      }
    );

    if (!res.data?.success) {
      toast.error(res.data?.message);
    }
    navigate("/");
    toast.success("Videos are refreshed..");
  };

  const handleChannel = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BDOMAIN}info/refresh/channel`,
      {
        withCredentials: true,
      }
    );

    if (!res.datda?.success) {
      toast.error(res.data?.message);
    }
    navigate("/");
    toast.success("Channel is refreshed..");
  };

  const handleReset = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BDOMAIN}sir/reset`, {
      withCredentials: true,
    });

    if (!res.data?.success) {
      toast.error(res.data?.message);
    }
    navigate("/me");
    toast.success("Password Reset successfully.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
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

  if (loading) return <p className="text-center p-4">Loading profile...</p>;
  if (!user)
    return <p className="text-center p-4 text-red-500">No profile found.</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-card border border-border rounded-lg shadow">
      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          {message && (
            <div className="mb-4 p-2 text-sm text-white bg-primary rounded">
              {message}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="default" className="flex-1">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={user.photoUrl || "/assets/images/sir.jpg"}
            alt={user.userName}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">{user.userName}</h1>
          <p className="text-gray-600">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>
              Account created: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p>Last updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
          <Button
            type="button"
            variant="default"
            className="mt-6"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>

          <div>
            {" "}
            <Button
              type="button"
              variant="default"
              className="mt-6"
              onClick={() => handleReset()}
            >
              Reset Password
            </Button>
            <Button
              type="button"
              variant="default"
              className="mt-6"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
            <Button
              type="button"
              variant="default"
              className="mt-6"
              onClick={() => handleVideos()}
            >
              Refresh Videos
            </Button>
            <Button
              type="button"
              variant="default"
              className="mt-6"
              onClick={() => handleChannel()}
            >
              Refresh Channel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
