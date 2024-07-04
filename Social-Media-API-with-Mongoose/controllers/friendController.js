import Friend from '../models/friendModel.js';
import User from '../models/userModel.js';

export const sendRequest = async (req, res) => {
  try {
    const friend = new Friend({
      requester: req.user._id,
      recipient: req.params.friendId,
      status: 1
    });
    await friend.save();
    res.status(201).send(friend);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const respondRequest = async (req, res) => {
  try {
    const friend = await Friend.findOne({
      requester: req.params.friendId,
      recipient: req.user._id
    });

    if (!friend) {
      return res.status(404).send({ error: 'Request not found' });
    }

    friend.status = req.body.status; // 2: accepted, 0: rejected
    await friend.save();
    res.send(friend);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getFriends = async (req, res) => {
  try {
    const friends = await Friend.find({
      $or: [
        { requester: req.user._id, status: 3 },
        { recipient: req.user._id, status: 3 }
      ]
    }).populate('requester recipient', 'name email');

    res.send(friends);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Friend.find({
      recipient: req.user._id,
      status: 1
    }).populate('requester', 'name email');

    res.send(requests);
  } catch (error) {
    res.status(500).send(error);
  } 
};
