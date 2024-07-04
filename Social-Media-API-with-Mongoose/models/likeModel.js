import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  createdAt: { type: Date, default: Date.now }
});

const Like = mongoose.model('Like', likeSchema);
export default Like;
