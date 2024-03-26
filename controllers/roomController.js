const ObjectID = require('mongoose').Types.ObjectId
const ContratModel = require('../models/ContratModel');
const RoomModel = require('../models/RoomModel');

module.exports.createRoom = async (req, res) => {
    try {
        const { user1ID, user2ID } = req.body;

        const existingRoom = await RoomModel.findOne({
            $or: [
                { user1ID: user1ID, user2ID: user2ID },
                { user1ID: user2ID, user2ID: user1ID }
            ]
        });

        if (existingRoom) {
            return res.status(200).json(existingRoom);
        }

        const newRoom = await RoomModel.create({ user1ID, user2ID, messages: [] });

        res.status(201).json(newRoom);
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        });
    }
};


module.exports.addMessageToRoom = async (req, res) => {
    try {
        const { roomID, senderID, receiverID, content } = req.body;

        if (!ObjectID.isValid(roomID))
            return res.status(400).json({ error: "Invalid roomID " + roomID })
        
        if (!ObjectID.isValid(senderID))
            return res.status(400).json({ error: "Invalid senderID " + senderID })
        
        if (!ObjectID.isValid(receiverID))
            return res.status(400).json({ error: "Invalid receiverID " + receiverID })

        const room = await RoomModel.findById(roomID)
 
        if (!room)
            return res.status(404).json({ error: "Room not found" })
    
        room.messages.push({ senderID, receiverID, content, timestamp: new Date() })
        await room.save();

        res.status(200).json({ message: "Message added to room ", room })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const { roomId } = req.body;

        const room = await RoomModel.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        room.messages = room.messages.filter(message => {
            return message._id.toString() !== messageId;
        });
        await room.save();

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


