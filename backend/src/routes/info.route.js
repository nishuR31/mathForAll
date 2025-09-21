import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  contact,
  fetchChannel,
  fetchVideo,
  health,
  ping,
  refreshChannel,
  refreshVideos,
} from "../controllers/info.controller.js";

let infoRouter = new express.Router();

// infoRouter.get("/refresh/channel", auth(true), refreshChannel);
// infoRouter.get("/refresh/videos", auth(true), refreshVideos);
infoRouter.get("/refresh/channel", auth(false), refreshChannel);
infoRouter.get("/refresh/videos", auth(false), refreshVideos);
infoRouter.get("/fetch/channel", fetchChannel);
infoRouter.get("/fetch/videos", fetchVideo);
infoRouter.get("/health", health);
infoRouter.post("/contact", contact);
infoRouter.get("/ping", ping);

export default infoRouter;
