const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts);

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:userId').post(createThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
