import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      owner: req.user._id
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('owner', 'name email');
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user._id });
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId, owner: req.user._id });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    Object.assign(post, req.body);
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.postId, owner: req.user._id });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};
