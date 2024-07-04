import User from "../models/userModel.js";

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password -tokens');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUserDetails = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'gender', 'avatar'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};
