"use client";

import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Order from "./Order";

export default function OrderPageClient() {
  const userInfo = useSelector((state) => state.users.userInfo);

  const [fetchOrder, setFetchOrder] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [orderCancel, setOrderCancel] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState("Con_order");

  useEffect(() => {
    fetchData();
  }, [userInfo]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://backend.aihomesd.com/getTheOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const completeOrder = data.filter((o) => o.status === "Delivered");
        const orderCancel = data.filter((o) => o.status === "Cancelled");
        const orderPro = data.filter(
          (o) => o.status !== "Cancelled" && o.status !== "Delivered"
        );
        setCompleteOrder(completeOrder);
        setOrderCancel(orderCancel);
        setFetchOrder(orderPro);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        paddingTop: "10px", // Top padding always 10px
        paddingX: {
          xs: "10px", // Mobile (extra-small screens) - horizontal padding
          sm: "20px", // Small screens (e.g., tablets)
          lg: "90px", // Large screens (e.g., desktops)
          xl: "90px", // Extra-large screens
        },
        paddingBottom: {
          xs: "10px", // Mobile (extra-small screens) - bottom padding
          sm: "20px", // Small screens (e.g., tablets)
          lg: "90px", // Large screens (e.g., desktops)
          xl: "90px", // Extra-large screens
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setPageState("Con_order");
              handleClose();
            }}
          >
            <HourglassEmptyIcon sx={{ mr: 1 }} /> Processing Order
          </MenuItem>
          <MenuItem
            onClick={() => {
              setPageState("Complete_order");
              handleClose();
            }}
          >
            <DoneIcon sx={{ mr: 1 }} /> Complete Order
          </MenuItem>
          <MenuItem
            onClick={() => {
              setPageState("Cancel_order");
              handleClose();
            }}
          >
            <CancelIcon sx={{ mr: 1 }} /> Cancel Order
          </MenuItem>
        </Menu>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {/* Redesigned Title Section */}
          {pageState === "Complete_order" && (
            <Box>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#333", // Dark gray color for the title
                  textAlign: "center", // Center-align the title
                }}
              >
                Completed Orders
              </Typography>
              <Divider
                sx={{ mb: 4, borderColor: "#d32f2f", width: "10%", mx: "auto" }}
              />
              <Box>
                {completeOrder.length > 0 ? (
                  completeOrder.map((or) => (
                    <Box key={or._id} sx={{ mb: 2 }}>
                      <Order orderDetails={or} userInfo={userInfo} />
                    </Box>
                  ))
                ) : (
                  <Typography>No completed orders found.</Typography>
                )}
              </Box>
            </Box>
          )}
          {pageState === "Cancel_order" && (
            <Box>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Cancelled Orders
              </Typography>
              <Divider
                sx={{ mb: 4, borderColor: "#d32f2f", width: "10%", mx: "auto" }}
              />
              <Box>
                {orderCancel.length > 0 ? (
                  orderCancel.map((or) => (
                    <Box key={or._id} sx={{ mb: 2 }}>
                      <Order orderDetails={or} userInfo={userInfo} />
                    </Box>
                  ))
                ) : (
                  <Typography>No cancelled orders found.</Typography>
                )}
              </Box>
            </Box>
          )}

          {pageState === "Con_order" && (
            <Box>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Processing Orders
              </Typography>
              <Divider
                sx={{ mb: 4, borderColor: "#d32f2f", width: "10%", mx: "auto" }}
              />
              <Box>
                {fetchOrder.length > 0 ? (
                  fetchOrder.map((or) => (
                    <Box key={or._id} sx={{ mb: 2 }}>
                      <Order orderDetails={or} userInfo={userInfo} />
                    </Box>
                  ))
                ) : (
                  <Typography>No processing orders found.</Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
