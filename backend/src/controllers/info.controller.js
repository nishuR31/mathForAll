import Channel from "../models/channel.model.js";
import Videos from "../models/videos.model.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { mail } from "../utils/mailer.js";
import codes from "../utils/statusCodes.js";

export let refreshChannel = asyncHandler(async (req, res) => {
  // Axios request
  let response = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${process.env.CHANNEL_ID}&key=${process.env.API_KEY}`
  );

  if (
    !response.data ||
    !response.data.items ||
    response.data.items.length === 0
  ) {
    return res.status(codes.notFound).json(
      new ApiResponse("No Channel found.", codes.notFound, {
        channel: [],
      }).res()
    );
  }

  // Update channel in DB
  let channel = await Channel.findOne({});
  if (!channel) {
    channel = new Channel(); // if no channel exists, create one
  }
  channel.data = response.data.items; // store directly, no stringify
  await channel.save();

  // Send response
  return res.status(codes.ok).json(
    new ApiResponse("Channel found.", codes.ok, {
      channel: response.data.items, // already JSON
    }).res()
  );
});

export let refreshVideos = asyncHandler(async (req, res) => {
  // Axios request
  let response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${process.env.CHANNEL_ID}&part=snippet,id&order=date&maxResults=30`
  );

  if (
    !response.data ||
    !response.data.items ||
    response.data.items.length === 0
  ) {
    return res.status(codes.notFound).json(
      new ApiResponse("No Videos found.", codes.notFound, {
        videos: [],
      }).res()
    );
  }

  // Update channel in DB
  let videos = await Videos.findOne({});
  if (!videos) {
    videos = new Videos(); // if no channel exists, create one
  }
  videos.data = response.data.items; // store directly, no stringify
  await videos.save();

  // Send response
  return res.status(codes.ok).json(
    new ApiResponse("Videos found.", codes.ok, {
      videos: response.data.items, // already JSON
    }).res()
  );
});

export let fetchChannel = asyncHandler(async (req, res) => {
  let res = await Channel.findOne({});
  if (!res) {
    return res.status(codes.notFound).json(
      new ApiResponse("No Channel found.", codes.notFound, {
        channel: [],
      }).res()
    );
  }

  return res.status(codes.ok).json(
    new ApiResponse("Channel found.", codes.ok, {
      channel: res.data,
    }).res()
  );
});

export let fetchVideo = asyncHandler(async (req, res) => {
  let res = await Videos.findOne({});
  if (!res) {
    return res.status(codes.notFound).json(
      new ApiResponse("No Videos found.", codes.notFound, {
        videos: [],
      }).res()
    );
  }

  return res.status(codes.ok).json(
    new ApiResponse("Videos found.", codes.ok, {
      videos: res.data,
    }).res()
  );
});

// controllers/health.controller.js

export const health = asyncHandler(async (req, res) => {
  return res
    .status(codes.ok)
    .json(new ApiResponse("Server is healthy.", codes.ok).res());
});

export const ping = asyncHandler(async (req, res) => {
  return res.status(codes.ok).json(new ApiResponse("pong", codes.ok).res());
});

export const contact = asyncHandler(async (req, res) => {
  let { name, email, subject, message } = req.body;

  await mail({
    to: process.env.MAIL,
    subject: subject,
    text: message,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #007bff;">${name}</h2>
    <p style="font-size: 15px; color: #333;">${subject}
    </p>
    <p style="font-size: 14px; color: #555;">
${message}    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 13px; color: #666;">
      Regards,<br/>
      <strong>${email}</strong>
    </p>
  </div>
</body>
</html>
`,
  });
  return res
    .status(codes.ok)
    .json(new ApiResponse("Mail sent successfully.", codes.ok).res());
});
