const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  user1ID: { type: String, required: true },
  user2ID: { type: String, required: true },
  messages: [{
    senderID: { type: String, required: true }, 
    receiverID: { type: String, required: true }, 
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }]
},
{
  timestamps: true
});

const RoomModel = mongoose.model('Room', roomSchema);

module.exports = RoomModel;
