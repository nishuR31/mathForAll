import cron from "node-cron";
import ApiResponse from "./apiResponse.js";

export default function schedule(func, time = "0 0 * * 0") {
  try {
    cron.schedule(time, async () => {
      let res = await func();
      res && console.log(new ApiResponse("Croning done.").res());
    });
  } catch (err) {
    console.error(new ApiErrorResponse("Error ocured while croning.").res());
  }
}
