const { connect, connection } = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = connection;
