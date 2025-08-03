import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../Session/SessionCard.jsx";
import { Typography, Box } from "@mui/material";
import toast from "react-hot-toast";

const MyDraftSessions = () => {
  const [sessions, setSessions] = useState([]);

  const fetchDrafts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/save-draft", {
        withCredentials: true,
      });
      setSessions(res.data.sessions);
    } catch (err) {
      toast.error("Failed to load drafts");
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" color="#C165FF" mb={3}>My Draft Sessions</Typography>
      {sessions.map((session) => (
        <SessionCard key={session._id} session={session} refresh={fetchDrafts} />
      ))}
    </Box>
  );
};

export default MyDraftSessions;
