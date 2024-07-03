import User from '../models/User.js';

export const getFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('friends', 'name email');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friendRequests', 'name email');
    res.status(200).json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const toggleFriendship = async (req, res) => {
  const { friendId } = req.params;

  try {
    const friend = await User.findById(friendId);
    if (!friend) return res.status(404).json({ message: "User not found" });

    const index = req.user.friends.indexOf(friendId);
    if (index === -1) {
      req.user.friends.push(friendId);
      friend.friendRequests.push(req.user._id);
    } else {
      req.user.friends.splice(index, 1);
      friend.friendRequests.splice(friend.friendRequests.indexOf(req.user._id), 1);
    }

    await req.user.save();
    await friend.save();

    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const respondToFriendRequest = async (req, res) => {
  const { friendId } = req.params;
  const { accept } = req.body;

  try {
    const friend = await User.findById(friendId);
    if (!friend) return res.status(404).json({ message: "User not found" });

    if (accept) {
      req.user.friends.push(friendId);
      friend.friends.push(req.user._id);
    }
    
    req.user.friendRequests.splice(req.user.friendRequests.indexOf(friendId), 1);
    await req.user.save();
    await friend.save();

    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
