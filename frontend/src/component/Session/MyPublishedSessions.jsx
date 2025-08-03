import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import SessionCard from "../Session/SessionCard";
import toast from "react-hot-toast";

const MyPublishedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPublishedSessions = async () => {
    try {
      const res = await axios.get("https://wellnessflow-backend.onrender.com/api/v1/sessions", {
        withCredentials: true,
      });
      setSessions(res.data.sessions || []);
    } catch (err) {
      toast.error("Failed to load published sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedSessions();
  }, []);

const handleUnpublish = async () => {
  try {
    await axios.patch(`https://wellnessflow-backend.onrender.com/api/v1/${session._id}/unpublish`, {}, {
      withCredentials: true,
    });
    toast.success("Session moved to drafts!");
    refresh();
  } catch (err) {
    toast.error("Failed to unpublish");
  }
};
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" color="#C165FF" gutterBottom>
        My Published Sessions
      </Typography>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : sessions.length === 0 ? (
        <Typography variant="h6" color="gray" mt={4}>
          No published sessions yet.
        </Typography>
      ) : (
        sessions.map((session) => (
          <SessionCard key={session._id} session={session} refresh={fetchPublishedSessions} isPublished />
        ))
      )}
      <Button variant="outlined" color="warning" onClick={handleUnpublish}>
  Unpublish
</Button>

    </Box>
  );
};

export default MyPublishedSessions;
