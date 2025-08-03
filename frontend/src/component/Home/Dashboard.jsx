import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box, Typography, Grid, Button, Card, CardContent,
  CardActions, Avatar, Chip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FolderIcon from '@mui/icons-material/Folder';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/sessions", 
        { withCredentials: true })
      .then((res) => setSessions(res.data.sessions))
      .catch((err) => console.error("Error fetching sessions:", err));
  }, []);

  const drafts = sessions.filter(s => s.status === "draft");
  const published = sessions.filter(s => s.status === "published");

  return (
    <Box p={4}>
      {/* Welcome Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>A</Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">Welcome, Adarsh 👋</Typography>
            <Typography variant="body2" color="text.secondary">Manage your wellness sessions below</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/editor"
        >
          New Session
        </Button>
      </Box>

      {/* Draft Sessions */}
      <Typography variant="h6" gutterBottom>📝 Drafts</Typography>
      <Grid container spacing={3} mb={5}>
        {drafts.length === 0 ? (
          <Typography variant="body2" color="text.secondary" ml={2}>No draft sessions found.</Typography>
        ) : (
          drafts.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {session.title}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                    {session.tags.map((tag, i) => (
                      <Chip key={i} label={tag} variant="outlined" size="small" />
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Status: <strong>{session.status}</strong>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    component={Link}
                    to={`/editor/${session._id}`}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Published Sessions */}
      <Typography variant="h6" gutterBottom>✅ Published Sessions</Typography>
      <Grid container spacing={3}>
        {published.length === 0 ? (
          <Typography variant="body2" color="text.secondary" ml={2}>No published sessions yet.</Typography>
        ) : (
          published.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {session.title}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                    {session.tags.map((tag, i) => (
                      <Chip key={i} label={tag} variant="outlined" size="small" />
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Uploaded JSON: <FolderIcon fontSize="small" />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    href={session.json_file_url}
                    target="_blank"
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
