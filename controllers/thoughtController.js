// Import Thought model
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find({})
          .sort({ _id: -1 })
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err)
          });
      },

    // Get thought by id
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought ID not found' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    
    // Create thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $push: {thoughts: _id }},
                    { new: true, runValidators: true }
                );
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },

    // Update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            {$set: body},
            { new: true, runValidators: true }
        )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought ID not found' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    
    // Delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought ID not found' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },

    // Create reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'Thought ID not found' })
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'Thought ID not found' })
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    }

}

module.exports = thoughtController;