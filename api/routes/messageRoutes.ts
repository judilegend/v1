import express from "express";
import * as messageController from "../controllers/messageController";

const router = express.Router();

router.post("/", messageController.createMessage);
router.get("/channel/:channelId", messageController.getMessagesForChannel);
router.get("/:messageId", messageController.getMessageById);
router.put("/:messageId", messageController.updateMessage);
router.delete("/:messageId", messageController.deleteMessage);
router.get("/task/:taskId", messageController.getMessagesForTask);
router.post("/direct", messageController.createDirectMessage);
router.post("/channel", messageController.createChannelMessage);
router.get("/direct/:userId1/:userId2", messageController.getDirectMessages);
router.get("/channel/:channelId", messageController.getChannelMessages);
router.get("/:roomId", messageController.getMessagesForRoom);

export default router;
