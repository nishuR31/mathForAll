import express from "express";
import auth from "../middleware/auth.middleware";
import {
  channel,
  channelEntry,
  health,
  videoEntry,
  videos,
} from "../controllers/info.controller";

let infoRouter = new express.Router();

infoRouter.get("/refresh/videos", auth(true), videoEntry);
infoRouter.get("/refresh/channel", auth(true), channelEntry);
infoRouter.get("/fetch/channel", channel);
infoRouter.get("/fetch/videos", videos);
infoRouter.get("/health", health);

export default infoRouter;
