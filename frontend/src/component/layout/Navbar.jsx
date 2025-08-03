import React, { useContext, useState } from "react";
import { Context } from "../Context/UserContext";
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
import SpaIcon from "@mui/icons-material/Spa"; // Wellness-like icon

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthorized(false);
      navigateTo("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  const menuItems = [
    { text: "HOME", path: "/" },
    { text: "My Sessions", path: "/my-sessions" },
    { text: "New Session", path: "/editor" }, // Editor route
  ];

  

  return (
    <>
   <AppBar
      position="static"
      sx={{
        bgcolor: "#11101d",
        boxShadow: "0 4px 12px rgba(255, 0, 150, 0.4)",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link to="/dashboard" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <SpaIcon sx={{ color: "#C165FF", fontSize: 32, mr: 1 }} />
            <Typography variant="h6" sx={{ color: "#C165FF", fontWeight: 600 }}>
              WellnessFlow
            </Typography>
          </Link>
        </Box>

        {/* Desktop Menu */}
        {isAuthorized && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  "&:hover": { color: "#C165FF" },
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
                "&:hover": { color: "#ff4081" },
              }}
            >
              LOGOUT
            </Button>
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isAuthorized && (
          <IconButton
            edge="end"
            sx={{ display: { md: "none" }, color: "#fff" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          width={260}
          sx={{ bgcolor: "#1e1e2f", height: "100%", color: "#fff" }}
          onClick={() => setOpen(false)}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <Divider sx={{ borderColor: "#444", my: 1 }} />
          </Box>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button component={Link} to={item.path} key={index}>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: 16, fontWeight: 500 }}
                />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemText
                primary="LOGOUT"
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#f72585",
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
    </>
  );
};


export default Navbar;
