import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: '10m' } }
});

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;
