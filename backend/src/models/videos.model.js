import mongoose from "mongoose";

const videosSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed, // can hold any JSON object
  },
});

const Videos = mongoose.model("Videos", videosSchema);

export default Videos;
