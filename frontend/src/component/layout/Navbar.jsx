import React, { useContext, useState } from "react";
import { Context } from "../../component/Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
  import '../../App.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("https://wellnessflow-backend.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthorized(false);
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
      setIsAuthorized(false);
    }
  };

  const menuItems = [
    { text: "DASHBOARD", path: "/dashboard" },
    { text: "MY SESSIONS", path: "/my-sessions" },
    { text: "DRAFTS", path: "/my-sessions/drafts" },
    { text: "PUBLISHED", path: "/my-sessions/published" },
    { text: "CREATE", path: "/editor" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#11101d",
        boxShadow: "0 4px 12px #65f0ff",
      }}
    >
 
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link>  <Typography variant="h6" sx={{color: "#c166ff",fontWeight: 600}}>WellnessFlow
          </Typography>
          </Link>
        </Box>

        {isAuthorized && (
          <>
          
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    "&:hover": { color: "#f72585" },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#f72585",
                  fontWeight: 600,
                }}
              >
                LOGOUT
              </Button>
            </Box>

         
            <IconButton
              edge="end"
              sx={{ display: { md: "none" }, color: "#fff" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </>
        )}
      </Toolbar>

    
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250, bgcolor: "#1e1e2f", height: "100%", color: "#fff" }}
          onClick={() => setOpen(false)}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <Divider sx={{ borderColor: "#444" }} />
          </Box>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="LOGOUT" sx={{ color: "#f72585" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
