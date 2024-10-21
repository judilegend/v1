import express from "express";
import * as directMessageController from "../controllers/direct_messageController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/contacts",
  authenticate,
  directMessageController.recupListContacts
);
router.post("/send", authenticate, directMessageController.sendMessage);
router.get(
  "/conversations",
  authenticate,
  directMessageController.recupAllDiscussionList
);
router.get(
  "/:id",
  authenticate,
  directMessageController.recupAllMessagesFromUser
);
router.get(
  "/contact/:id",
  authenticate,
  directMessageController.recupUserContactById
);
router.put(
  "/read/:id",
  authenticate,
  directMessageController.setLuAllMessageByUserId
);
router.get(
  "/count/unread",
  authenticate,
  directMessageController.countUnreadMessage
);
router.delete(
  "/:message_id",
  authenticate,
  directMessageController.deleteMessage
);

export default router;
