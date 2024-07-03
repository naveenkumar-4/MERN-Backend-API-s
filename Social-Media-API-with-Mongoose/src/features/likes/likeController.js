import Post from '../posts/postSchema.js';
import Comment from '../comments/commentSchema.js';

export const toggleLike = async (req, res) => {
  const { id } = req.params;

  try {
    let target = await Post.findById(id) || await Comment.findById(id);
    if (!target) return res.status(404).json({ message: "Post or Comment not found" });

    const index = target.likes.indexOf(req.user._id);
    if (index === -1) {
      target.likes.push(req.user._id);
    } else {
      target.likes.splice(index, 1);
    }

    await target.save();
    res.status(200).json(target);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getLikes = async (req, res) => {
  const { id } = req.params;

  try {
    let target = await Post.findById(id).populate('likes', 'name email') || await Comment.findById(id).populate('likes', 'name email');
    if (!target) return res.status(404).json({ message: "Post or Comment not found" });

    res.status(200).json(target.likes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
