const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // Regex to validate email address
      match: [/.+\@.+\..+/, 'Email must match'],
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;