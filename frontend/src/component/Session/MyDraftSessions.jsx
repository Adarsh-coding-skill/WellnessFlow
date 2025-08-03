import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../Session/SessionCard.jsx";
import { Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import "../../CSS/session.css"
  import '../../App.css';
const Draft = () => {
  const [sessions, setSessions] = useState([]);

  const fetchDrafts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/me", {
        withCredentials: true,
      });
      const drafts = res.data.sessions.filter((s) => s.status === "draft");
      setSessions(drafts);
      toast.success("Drafts loaded successfully");
    } catch (err) {
      toast.error("Failed to load drafts");
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <Box className="drafts-container">
      <Typography variant="h4" className="drafts-title">
        My Draft Sessions
      </Typography>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <SessionCard key={session._id} session={session} refresh={fetchDrafts} />
        ))
      ) : (
        <Typography color="textSecondary">No draft sessions found.</Typography>
      )}
    </Box>
  );
};

export default Draft;
