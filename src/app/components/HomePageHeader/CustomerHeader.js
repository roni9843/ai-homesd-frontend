import {
  ArrowDropDown as ArrowDropDownIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function CustomerHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h6" onClick={handleMenuClose}>
        HOME
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
        }}
        onClick={handleMenuClick}
      >
        <Typography variant="h6">ALL FOOD</Typography>
        <ArrowDropDownIcon />
      </Box>
      <Typography variant="h6">ABOUT</Typography>
      <Typography variant="h6">CONTACT</Typography>

      {/* Search Bar in Drawer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "0",
          maxWidth: "100%",
          width: "100%",
          height: "40px",
          marginTop: "20px",
        }}
      >
        <InputBase
          placeholder="Search Here"
          sx={{
            flex: 1,
            paddingLeft: "8px",
            fontSize: "14px",
            height: "100%",
          }}
        />
        <IconButton
          type="submit"
          sx={{
            backgroundColor: "#FF0000",
            borderRadius: "0",
            color: "#fff",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "#fff", height: "60px" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Vertically center items
          padding: { xs: "0 10px", lg: "0 20px" },
          minHeight: "60px",
        }}
      >
        {/* Left Side: Menu Icon, Logo, and Navigation Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // Vertically center items
            gap: isMobile ? "0" : "20px",
            flexGrow: 1,
          }}
        >
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={toggleDrawer} sx={{ color: "#000" }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start", // Center logo on mobile
              width: isMobile ? "100%" : "auto", // Take full width on mobile
            }}
          >
            <Image
              src="https://i.ibb.co/zGzXCjC/cropped-HF-Food-Service-Logo-Color-and-Font-01-Custom-2.png"
              alt="Logo"
              width={50}
              height={50}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Navigation Links (only on large screens) */}
          {!isMobile && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFA500",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  HOME
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleMenuClick}
                  id="all-food-menu-trigger"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    ALL FOOD
                  </Typography>
                  <ArrowDropDownIcon sx={{ color: "#000" }} />
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: "#000", fontWeight: "bold", fontSize: "14px" }}
                >
                  ABOUT
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#000", fontWeight: "bold", fontSize: "14px" }}
                >
                  CONTACT
                </Typography>
              </Box>

              {/* Search Bar */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "0",
                  maxWidth: "500px",
                  width: "100%",
                  height: "40px",
                }}
              >
                <InputBase
                  placeholder="Search Here"
                  sx={{
                    flex: 1,
                    paddingLeft: "8px",
                    fontSize: "14px",
                    height: "100%",
                  }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    backgroundColor: "#FF0000",
                    borderRadius: "0",
                    color: "#fff",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>

        {/* Right Side: Shopping Cart Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="cart" sx={{ color: "#000" }}>
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>

      {/* Dropdown Menu for ALL FOOD */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ mt: "5px" }}
      >
        <MenuItem onClick={handleMenuClose}>Category 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Category 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>Category 3</MenuItem>
      </Menu>
    </AppBar>
  );
}
