import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SessionCard from "../Session/SessionCard";
  import "../../CSS/Session.css";
  import '../../App.css';
  
const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/sessions", {
          withCredentials: true,
        });
        setSessions(res.data.sessions);
      } catch (err) {
        setError("Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="my-sessions-container">
      <h1 className="my-sessions-title">My Wellness Sessions</h1>

      {loading && <p className="my-sessions-loading">Loading sessions...</p>}
      {error && <p className="my-sessions-error">{error}</p>}
      {!loading && sessions.length === 0 && (
        <p className="my-sessions-empty">You haven't created any sessions yet.</p>
      )}

      <div className="my-sessions-grid">
        {sessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
            onClick={() => navigate(`/editor/${session._id}`)}
          />
        ))}
      </div>

      <div className="my-sessions-button-container">
        <button
          onClick={() => navigate("/editor")}
          className="my-sessions-new-button"
        >
          + New Session
        </button>
      </div>
    </div>
  );
};

export default MySessions;
