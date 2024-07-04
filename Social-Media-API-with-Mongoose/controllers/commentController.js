import Comment from "../models/commentModel.js";

export const addComment = async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      owner: req.user._id,
      post: req.params.postId
    });
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('owner', 'name email');
    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId, owner: req.user._id });
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }
    comment.text = req.body.text;
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.commentId, owner: req.user._id });
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }
    res.send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
};
