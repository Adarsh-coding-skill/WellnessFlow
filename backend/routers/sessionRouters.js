const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
  unpublishSession,
} = require("../controller/sessController.js");

const router = express.Router();

router.get("/sessions", getPublicSessions);
router.get("/public", getPublicSessions);  

router.use(protect); 
router.get("/me", getMySessions);
router.post("/save-draft", saveDraft);
router.post("/publish",protect, publishSession);
router.patch("/:id/unpublish", unpublishSession);
router.get("/:id", getSessionById); 

module.exports = router;