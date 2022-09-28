// Import User Model
const User = require('../models/User');

// Set up controller for User
const userController = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },


  // Get user by id
  getSingleUser({params}, res) {
    User.findOne({ _id: params.id }) 
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then((dbUserData) => {
        if(!dbUserData) {
          res.status(404).json({message: 'User ID not found'});
          return
        }
        res.json(dbUserData)
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      });
  },
  

  // Create new user
  createUser({body}, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // Update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id }, body, { new: true, runValidators: true })
      .then((dbUserData) => {
        if(!dbUserData) {
          res.status(404).json({message: 'User ID not found'});
          return
        }
        res.json(dbUserData)
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      });
  },

  // Delete user
  deleteUser({params}, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({message: 'User ID not found'});
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err));
  },

  // Add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId }},
      { new: true, runValidators: true }
    )
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then((dbUserData) => {
      if(!dbUserData) {
        res.status(404).json({message: 'User ID not found'});
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err)
    });
  },

  // Delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId }},
      { new: true}
    )
    .populate({
      path: 'friends',
      select: ('-__v')
    })
    .select('-__v')
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({message: 'User ID not found'});
        return
      }
      res.json(dbUserData)
    })
    .catch(err => res.status(400).json(err));
  }

};

// Export controller
module.exports = userController;
