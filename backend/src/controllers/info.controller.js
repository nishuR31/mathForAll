import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { channelData, videoData } from "../utils/channelEntry";
import schedule from "../utils/cron";

export let videoEntry = asyncHandler(async (req, res) => {
  let done = await videoData();
  done
    ? console.log(`Video set refreshed.`)
    : console.error(`Error refreshing video Set`);
});

export let channelEntry = asyncHandler(async (req, res) => {
  let done = await channelData();
  done
    ? console.log(`Channel set refreshed.`)
    : console.error(`Error refreshing channel data`);
});

// controllers/health.controller.js

export const health = asyncHandler(async (req, res) => {
  return res
    .status(codes.ok)
    .json(new ApiResponse("Server is running fine.", codes.ok).res());
});

export const videos = asyncHandler(async (req, res) => {
  let response = await fetch("../data/videos.json");
  let data = await response.json();
  return res
    .status(codes.ok)
    .json(
      new ApiResponse("Videos found.", codes.ok, { videos: data.items }).res()
    );
});

export const channel = asyncHandler(async (req, res) => {
  let response = await fetch("../data/channel.json");
  let data = await response.json();
  return res
    .status(codes.ok)
    .json(
      new ApiResponse("Videos found.", codes.ok, { videos: data.items }).res()
    );
});
