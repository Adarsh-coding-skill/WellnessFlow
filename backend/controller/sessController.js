const Session = require("../Models/Session");


const saveDraft = async (req, res) => {
  try {
   
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const { id, title, tags, json_file_url } = req.body;

    let session;
    if (id) {
      session = await Session.findOneAndUpdate(
        {
          _id: id,
          user_id: req.user._id 
        },
        {
          title,
          tags,
          json_file_url,
          status: "draft"
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user._id,
        title,
        tags,
        json_file_url,
        status: "draft"
      });
    }

    res.status(200).json({ session });
  } catch (err) {
    console.error("❌ Draft Save Error:", err);
    res.status(500).json({ message: "Failed to save draft.", error: err.message });
  }
};


const publishSession = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id, title, tags, json_file_url } = req.body;

    let session;

    if (id) {

      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user._id },
        {
          title,
          tags,
          json_file_url,
          status: "published",
        },
        { new: true }
      );
    } else {
    
      session = await Session.create({
        title,
        tags,
        json_file_url,
        status: "published",
        user_id: req.user._id,
      });
    }

    res.status(200).json({ session });
  } catch (error) {
  
    res.status(500).json({ message: "Failed to publish session.", error: error.message });
  }
};


const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id }).sort({
      updated_at: -1,
    });
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your sessions", error: err.message });
  }
};

const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" }).sort({
      updated_at: -1,
    });
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch public sessions", error: err.message });
  }
};


const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

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
    const { id } = req.params;

    const session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user._id },
      { status: "draft" },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: "Failed to unpublish session", error: error.message });
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
