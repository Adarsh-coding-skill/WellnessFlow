import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import "../../CSS/session.css";
  import '../../App.css';
const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonFileUrl, setJsonFileUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://wellnessflow-backend.onrender.com/api/v1/${id}`, { withCredentials: true })
      .then((res) => {
        const session = res.data.session;
        setTitle(session.title || "");
        setTags((session.tags || []).join(", "));
        setJsonFileUrl(session.json_file_url || "");
      })
      .catch((err) => {
        console.error("Failed to load session:", err.response?.data || err.message);
        alert("Failed to load session.");
      });
  }, [id]);

  const autoSave = debounce(() => {
    if (!title.trim()) return;

    setSaving(true);

    axios
      .post(
        "https://wellnessflow-backend.onrender.com/api/v1/save-draft",
        {
          id,
          title,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          json_file_url: jsonFileUrl,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (!id) navigate(`/editor/${res.data.session._id}`);
      })
      .catch((err) => {
        console.error("Auto-save error:", err.response?.data || err.message);
      })
      .finally(() => setSaving(false));
  }, 5000);

  useEffect(() => {
    if (title || tags || jsonFileUrl) autoSave();
    return () => autoSave.cancel();
  }, [title, tags, jsonFileUrl]);

  // 🚀 Publish session
  const handlePublish = async () => {
    try {
      await axios.post(
        "https://wellnessflow-backend.onrender.com/api/v1/publish",
        {
          id,
          title,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          json_file_url: jsonFileUrl || "",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Session published successfully!");
      navigate("/my-sessions");
    } catch (err) {
      console.error("❌ Publish failed:", err.response?.data || err.message);
      alert("Failed to publish session.");
    }
  };

  return (
    <div className="editor-container">
      <h2 className="editor-title">{id ? "Edit" : "New"} Session</h2>

      <input
        className="editor-input"
        placeholder="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="editor-input"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        className="editor-input"
        placeholder="JSON File URL"
        value={jsonFileUrl}
        onChange={(e) => setJsonFileUrl(e.target.value)}
      />

      <div className="editor-footer">
        <button className="editor-button" onClick={handlePublish}>
          Publish
        </button>
        {saving && <span className="editor-saving-text">Auto-saving...</span>}
      </div>
    </div>
  );
};

export default Editor;
