// Import User Model
const User = require('../models/User');

// Set up controller for User
const userController = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
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


  // Get user by id
  getSingleUser({params}, res) {
    user.findOne({_id: params.id})
  },

  // Create new user
  createUser({body}, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Update user
  updateUser(req, res) {

  },

  // Delete user
  deleteUser({params}, res) {
    
  },

  // Add friend
  addFriend({params}, res) {
    
  },
  // Delete friend
  deleteFriend({}, res) {

  }
}



module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};
