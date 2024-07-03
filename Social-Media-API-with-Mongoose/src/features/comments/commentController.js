import Comment from "./commentSchema.js";
import Post from "../posts/postSchema.js";

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = new Comment({ user: req.user._id, post: postId, text });
    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId }).populate('user', 'name email');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const updates = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }

    Object.keys(updates).forEach((update) => comment[update] = updates[update]);
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.remove();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
