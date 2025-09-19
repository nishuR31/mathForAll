import mongoose from "mongoose";
import required from "../utils/required.js";
import bcrypt from "bcrypt";
let userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, required("username")],
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: [true, required("firstname")],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: [true, required("email")],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, required("password")],
      trim: true,
      // select:false
    },
    photoUrl: {
      type: String,
      default: `${process.env.FDOMAIN}/assets/images/sir.png`,
      trim: true,
    },

    refreshToken: { type: String },
    otp: {
      code: { type: String },
      verified: { type: Boolean },
      expiry: { type: Date },
    },
    yt: {
      type: String,
      default: "https://www.youtube.com/@mathematicsforall9108",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("findByIdAndUpdate", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("findOneAndUpdate", async function (next) {
  let update = this.getUpdate();

  if (update.password) {
    let hashed = await bcrypt.hash(update.password, 10);
    this.setUpdate({ ...update, password: hashed });
  }
  next();
});

let User = mongoose.model("User", userSchema);
export default User;
