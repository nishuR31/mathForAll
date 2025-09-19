import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { channelData, videoData } from "../utils/channelEntry.js";
import { mail } from "../utils/mailer.js";
import codes from "../utils/statusCodes.js";

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

// export const videos = asyncHandler(async (req, res) => {
//   let response = await fetch("../data/videos.json");
//   let data = await response.json();
//   return res
//     .status(codes.ok)
//     .json(
//       new ApiResponse("Videos found.", codes.ok, { videos: data.items }).res()
//     );
// });

// export const channel = asyncHandler(async (req, res) => {
//   let response = await fetch("../data/channel.json");
//   let data = await response.json();
//   return res
//     .status(codes.ok)
//     .json(
//       new ApiResponse("Videos found.", codes.ok, { videos: data.items }).res()
//     );
// });

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
