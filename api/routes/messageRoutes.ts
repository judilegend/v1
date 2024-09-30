// const express = require("express");
// const messageController = require("../controllers/messageController");

// const router = express.Router();

// router.get("/", messageController.getMessages);
// router.post("/", messageController.createMessage);

// module.exports = router;
import express from "express";
import * as messageController from "../controllers/messageController";

const router = express.Router();

router.get("/:userId", messageController.getMessages);
router.post("/", messageController.createMessage);

export default router;
