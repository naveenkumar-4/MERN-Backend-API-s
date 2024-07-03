import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const OtpModel = mongoose.model("Otp", otpSchema);
export default OtpModel;
