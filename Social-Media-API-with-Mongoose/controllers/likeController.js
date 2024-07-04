import Like from '../models/likeModel.js';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // 'post' or 'comment'
    const like = await Like.findOne({ owner: req.user._id, [type]: id });

    if (like) {
      await like.remove();
      return res.send({ message: 'Unliked' });
    }

    const newLike = new Like({
      owner: req.user._id,
      [type]: id
    });
    await newLike.save();
    res.send(newLike);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // 'post' or 'comment'
    const likes = await Like.find({ [type]: id }).populate('owner', 'name email');
    res.send(likes);
  } catch (error) {
    res.status(500).send(error);
  }
};
