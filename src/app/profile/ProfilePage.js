import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserInfo } from "../redux/userSlice";

const ProfilePage = () => {
  let userInfoRedux = useSelector((state) => state.users.userInfo);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfoState] = useState({
    name: userInfoRedux?.username,
    email: userInfoRedux?.email,
    timeZone: "(GMT+6:00), Bangladesh",
    language: "English",
    phoneNumber: userInfoRedux?.phoneNumber,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfoState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://backend.aihomesd.com/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfoRedux._id,
          username: userInfo.name,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserInfo(data));
        dispatch(setUserEmail(data.email));
        setIsEditing(false);
      } else {
        console.error("Failed to update profile", response);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "20px auto",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    coverPhoto: {
      width: "100%",
      height: "200px",
      backgroundImage: "url('https://your-cover-photo-url.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
    },
    avatarContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: "-40px", // Reduced top value to decrease the gap
      marginBottom: "-30px", // Reduced bottom margin to close the gap
    },
    avatar: {
      width: "100px", // Reduced avatar size slightly
      height: "100px", // Reduced avatar size slightly
      border: "4px solid white", // Adjusted border
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    profileInfo: {
      padding: "10px", // Adjusted padding to reduce gaps
      textAlign: "center",
    },
    fieldContainer: {
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
    },
    fieldLabel: {
      fontWeight: "bold",
      color: "#666",
    },
    fieldValue: {
      color: "#333",
    },
    editButton: {
      color: "#007bff",
      cursor: "pointer",
    },
  };

  return (
    <Box style={styles.container}>
      {/* Cover Photo */}
      {/* Cover Photo */}
      <Box
        style={{
          ...styles.coverPhoto,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "start",
          padding: "10px",
        }}
      >
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleEditToggle}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </MenuItem>
        </Menu>
      </Box>

      {/* Avatar */}
      <Box style={styles.avatarContainer}>
        <Avatar
          alt="Profile Image"
          src={userInfoRedux?.avatarUrl || null} // If there's an avatar URL, use it, otherwise, show the first letter
          style={styles.avatar}
        >
          {!userInfoRedux?.avatarUrl && userInfoRedux?.username?.charAt(0)}{" "}
          {/* Show first letter if no avatar */}
        </Avatar>
      </Box>

      {/* Profile Info */}
      <Box style={styles.profileInfo}>
        <Typography variant="h5">{userInfo.name}</Typography>
      </Box>

      {/* Editable User Fields */}
      <form onSubmit={handleSubmit}>
        {[
          {
            label: "User name",
            name: "name", // Updated to "name" to match state
            value: userInfo.name,
            editable: true,
          },
          {
            label: "Email",
            name: "email",
            value: userInfo.email,
            editable: true,
          },
          {
            label: "Time Zone",
            name: "timeZone",
            value: userInfo.timeZone,
            editable: true,
          },
          {
            label: "Language",
            name: "language",
            value: userInfo.language,
            editable: true,
          },
          {
            label: "Phone Number",
            name: "phoneNumber",
            value: userInfo.phoneNumber,
            editable: true,
          },
        ].map((field, index) => (
          <Box key={index} style={styles.fieldContainer}>
            <Typography variant="body1" style={styles.fieldLabel}>
              {field.label}
            </Typography>
            {isEditing ? (
              <TextField
                name={field.name} // This now matches the state key
                value={field.value}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            ) : (
              <Typography variant="body1" style={styles.fieldValue}>
                {field.value}
              </Typography>
            )}
          </Box>
        ))}

        {/* Submit Button */}
        {isEditing && (
          <Box textAlign="center" padding="20px">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default ProfilePage;
