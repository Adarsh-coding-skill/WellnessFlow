const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
  unpublishSession
} = require("../controller/sessController.js");

const router = express.Router();

router.get("/sessions", getPublicSessions);
router.use(protect);
router.post("/save-draft", protect, saveDraft);
router.post("/publish", protect, publishSession);
router.get("/me", protect, getMySessions);
router.get("/public", getPublicSessions);
router.get("/:id", protect, getSessionById);
router.patch("/:id/unpublish",protect, unpublishSession);

module.exports = router;