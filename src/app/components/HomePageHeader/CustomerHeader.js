import {
  ArrowDropDown as ArrowDropDownIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { blackColor } from "../../../../color";

export default function CustomerHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filterCategory = useSelector((state) => state.users.filterCategory);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const userInfo = useSelector((state) => state.users.userInfo);
  const AllProduct = useSelector((state) => state.users.AllProduct);
  // For testing purposes, use the below static state
  // const AllProduct = useState([...]);

  const router = useRouter();
  const cart = useSelector((state) => state.users.cart);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (inputValue.length >= 3) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = AllProduct.filter((item) => {
      const queryLowerCase = query.toLowerCase();
      const nameMatches = item.productName
        .toLowerCase()
        .includes(queryLowerCase);
      const tagMatches = item.productTag.some((tag) =>
        tag.toLowerCase().includes(queryLowerCase)
      );
      const descriptionMatches = item.productDescription
        .toLowerCase()
        .includes(queryLowerCase);

      return nameMatches || tagMatches || descriptionMatches;
    });

    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.productName);
    setSuggestions([]);
  };

  const handleButtonClick = async (props) => {
    if (!userInfo) {
      router.push(`/login?callbackUrl=/${props}`);
    } else {
      router.push(`/${props}`);
    }
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
      <Link href="/">
        <Typography
          //    onClick={() => router.push(`/`)}
          variant="h6"
          sx={{ cursor: "pointer" }}

          //onClick={handleMenuClose}
        >
          HOME
        </Typography>
      </Link>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
        }}
        onClick={handleMenuClick}
      >
        <Typography variant="h6">ALL Product</Typography>
        <ArrowDropDownIcon />
      </Box>
      <Typography
        sx={{ cursor: "pointer" }}
        variant="h6"
        onClick={() => router.push(`/about`)}
      >
        ABOUT
      </Typography>
      <Typography
        sx={{ cursor: "pointer" }}
        variant="h6"
        onClick={() => router.push(`/contact`)}
      >
        CONTACT
      </Typography>

      {/* Search Bar in Drawer */}
      <Box
        sx={{
          display: "none",
          // display: "flex",
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

  const profileStyles = {
    profileImage: {
      width: isSmallScreen ? "25px" : "25px",
      height: isSmallScreen ? "25px" : "25px",
      borderRadius: "50%",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isSmallScreen ? "15px" : "20px",
      color: "#fff",
      margin: "0 auto",
    },
  };

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
          padding: { xs: "0 10px", lg: "0 50px" },
          padding: { xs: "0 10px", lg: "0px" },
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
              cursor: "pointer",
            }}
          >
            <Image
              src="https://i.ibb.co/ynTcnkK/Asset-1.png"
              alt="Logo"
              width={50}
              height={50}
              onClick={() => router.push(`/`)}
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
                  onClick={() => router.push(`/`)}
                  variant="body1"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
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
                    ALL Product
                  </Typography>
                  <ArrowDropDownIcon sx={{ color: "#000" }} />
                </Box>
                <Typography
                  onClick={() => router.push(`/about`)}
                  variant="body1"
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  ABOUT
                </Typography>
                <Typography
                  onClick={() => router.push(`/contact`)}
                  variant="body1"
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  CONTACT
                </Typography>
              </Box>

              {/* Search Bar */}
              <Box
                sx={{
                  display: "none",
                  //  display: "flex",
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
          <Link
            href="/productCart"
            style={{ textDecoration: "none", color: blackColor }}
          >
            <Badge
              badgeContent={totalQuantity}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "black", // Change badge background color
                  color: "white", // Change badge text color
                },
              }}
            >
              <ShoppingCartIcon style={{ fontSize: "20px" }} />
            </Badge>
          </Link>
        </Box>
        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleButtonClick("orderShippingInfo")}
        >
          <LocalMallIcon style={{ fontSize: "20px", color: blackColor }} />
        </div>
        <div
          onClick={() => handleButtonClick("profile")}
          style={{
            marginLeft: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {userInfo ? (
            <div style={profileStyles.profileImage}>
              {userInfo.username.charAt(0)}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "black", // Set background color to black
                borderRadius: "50%", // Make it round
                padding: "5px", // Add some padding around the icon
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PersonIcon style={{ fontSize: "20px", color: "white" }} />
            </div>
          )}
        </div>
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
