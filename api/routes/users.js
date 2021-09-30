const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(200).send(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("Only can update your account");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete({ _id: req.params.id });

      res.status(200).send("Account deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("Only can delete your account");
  }
});

// get user
router.get("/", async (req, res) => {
  /** code a query so can fetch by username and id */
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    const { password, isAdmin, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const friends = await Promise.all(
      currentUser.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((f) => {
      const { _id, username, profilePicture } = f;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userF = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userF.followers.includes(req.body.userId)) {
        await userF.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User follow");
      } else {
        res.status(404).json("user its follow");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Cant follow your self");
  }
});

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userUnF = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (userUnF.followers.includes(req.body.userId)) {
        await userUnF.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User unfollow");
      } else {
        res.status(404).json("user its not unfollow");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Cant unfollow your self");
  }
});
module.exports = router;
