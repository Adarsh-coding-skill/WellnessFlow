import React from "react";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SessionCard = ({ session, refresh }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editor/${session._id}`);
  };

  const handlePublish = async () => {
    try {
      await axios.patch(
        `https://wellnessflow-backend.onrender.com/api/v1/${session._id}/publish`,
        {},
        { withCredentials: true }
      );
      toast.success("Session published!");
      refresh();
    } catch (err) {
      toast.error("Failed to publish");
    }
  };

  const handleUnpublish = async () => {
  try {
    await axios.patch(
      `https://wellnessflow-backend.onrender.com/api/v1/${session._id}/unpublish`,
      {},
      { withCredentials: true }
    );
    toast.success("Session moved back to drafts!");
    refresh();
  } catch (err) {
    toast.error("Failed to unpublish session");
  }
};

  return (
    <Card sx={{ mb: 2, backgroundColor: "#1e1e2f", color: "#C165FF", p: 2 }}>
      <CardContent>
        <Typography variant="h6">{session.title}</Typography>
        <Typography variant="body2" color="#aaa">
          Tags: {session.tags?.join(", ") || "None"}
        </Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outlined" color="info" onClick={handleEdit}>
            Edit
          </Button>
          {session.status === "draft" ? (
            <Button variant="contained" color="success" onClick={handlePublish}>
              Publish
            </Button>
          ) : (
            <Button variant="outlined" color="error" onClick={handleUnpublish}>
              Unpublish
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
