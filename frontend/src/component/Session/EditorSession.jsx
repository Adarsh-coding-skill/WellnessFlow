import React, { useState, useEffect } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

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
      .get(`http://localhost:4000/api/v1/${id}`, { withCredentials: true })
      .then((res) => {
        const session = res.data.session;
        setTitle(session.title);
        setTags(session.tags.join(", "));
        setJsonFileUrl(session.json_file_url);
      });
  }, [id]);

  const autoSave = debounce(() => {
    setSaving(true);
    axios
      .post(
        "http://localhost:4000/api/v1/save-draft",
        { id, title, tags: tags.split(",").map(t => t.trim()), json_file_url: jsonFileUrl },
        { withCredentials: true }
      )
      .then((res) => {
        if (!id) navigate(`/editor/${res.data.session._id}`);
      })
      .finally(() => setSaving(false));
  }, 5000);


  useEffect(() => {
    if (title || tags || jsonFileUrl) autoSave();
    return () => autoSave.cancel();
  }, [title, tags, jsonFileUrl]);

  const handlePublish = async () => {
    await axios.post("http://localhost:4000/api/v1/publish", {
      id,
      title,
      tags: tags.split(",").map(t => t.trim()),
      json_file_url: jsonFileUrl || ""
    }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/my-sessions");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "New"} Session</h2>

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4 rounded"
        placeholder="JSON File URL"
        value={jsonFileUrl}
        onChange={(e) => setJsonFileUrl(e.target.value)}
      />

      <div className="flex justify-between">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handlePublish}>
          Publish
        </button>
        {saving && <span className="text-gray-500">Auto-saving...</span>}
      </div>
    </div>
  );
};

export default Editor;
