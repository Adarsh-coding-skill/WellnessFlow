const Session = require("../Models/Session");

// Create or update draft
const saveDraft = async (req, res) => {
  try {
    const { id, title, tags, json_file_url } = req.body;

    let session;
    if (id) {

      session = await Session.findOneAndUpdate(
        {
          _id: id, user: req.user._id
        },
        {
          title, tags, json_file_url, status: "draft"
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user: req.user._id,
        title,
        tags,
        json_file_url,
        status: "draft",
      });
    }

    res.status(200).json({ session });
  } catch (err) {
    console.error("Draft Save Error:", err);
    res.status(500).json({ message: "Failed to save draft." });
  }
};



// Publish session
const publishSession = async (req, res) => {
  try {
    const { id, title, tags, json_file_url } = req.body;

    let session;

    if (id) {
      session = await Session.findOneAndUpdate(
        {
          _id: id, user_id: req.user._id
        },
        {
          title, tags, json_file_url, status: "published", updated_at: Date.now()
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user._id,
        title,
        tags,
        json_file_url,
        status: "published",
      });
    }

    res.status(201).json({ session });
  } catch (err) {
    console.error("Publish Session Error:", err);
    res.status(500).json({ message: "Failed to publish session." });
  }
};

const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id }).sort({ updated_at: -1 });
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your sessions", error: err.message });
  }
};


const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" }).sort({ updated_at: -1 });
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch public sessions", error: err.message });
  }
};


const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Restrict private drafts to owners only
    if (session.status === "draft" && session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to view this session" });
    }

    res.status(200).json({ session });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch session", error: err.message });
  }
};

const unpublishSession = async (req, res) => {
  try {
    const session = await Session.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user._id,
        status: "published",
      },
      {
        status: "draft",
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Published session not found or unauthorized" });
    }

    res.status(200).json({ message: "Session unpublished successfully", session });
  } catch (err) {
    console.error("Unpublish Session Error:", err);
    res.status(500).json({ message: "Failed to unpublish session." });
  }
};




module.exports = {
  saveDraft,
  publishSession,
  getMySessions,
  getPublicSessions,
  getSessionById,
  unpublishSession,
};
