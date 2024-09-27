const Message = require("../models/message");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [["timestamp", "ASC"]] });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error creating message" });
  }
};
