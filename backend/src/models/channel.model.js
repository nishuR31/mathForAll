import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed, // can hold any JSON object
  },
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
