import express from "express";
import { pieceJointeController } from "../controllers/pieceJointeController";
import { upload } from "../config/multerConfig";

const router = express.Router();

router.post("/upload", upload.single("file"), pieceJointeController.upload);
router.get("/activite/:activiteId", pieceJointeController.getByActiviteId);
router.delete("/:id", pieceJointeController.delete);

export default router;
