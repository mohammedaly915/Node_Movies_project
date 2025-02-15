const mongoose = require('mongoose');

const MyListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
movieId: [
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Movie',
  }
]
}
  );

module.exports = mongoose.model('mylist', MyListSchema);
