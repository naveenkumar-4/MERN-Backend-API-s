import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
