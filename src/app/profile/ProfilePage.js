import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setUserInfo, setUserPhone } from "../redux/userSlice";

const ProfilePage = () => {
  let userInfoRedux = useSelector((state) => state.users.userInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfoState] = useState({
    name: userInfoRedux?.username,
    timeZone: "(GMT+6:00), Bangladesh",
    language: "English",
    phoneNumber: userInfoRedux?.phoneNumber,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
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

  const handleLogOut = () => {
    Cookies.remove("token");
    dispatch(logOut());
    handleClose();
    router.push(`/`);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfoState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(""); // Reset error message
    try {
      const response = await fetch("https://backend.aihomesd.com/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfoRedux._id,
          username: userInfo.name,
          phoneNumber: userInfo.phoneNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserInfo(data));
        dispatch(setUserPhone(data.phone));
        setIsEditing(false);
      } else {
        const data = await response.json();
        setErrorMessage("Failed to update profile: " + data.message);
      }
    } catch (error) {
      setErrorMessage("Error updating profile: " + error.message);
    } finally {
      setLoading(false); // Stop loading
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
      top: "-40px",
      marginBottom: "-30px",
    },
    avatar: {
      width: "100px",
      height: "100px",
      border: "4px solid white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    profileInfo: {
      padding: "10px",
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
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
      </Box>

      {/* Avatar */}
      <Box style={styles.avatarContainer}>
        <Avatar
          alt="Profile Image"
          src={userInfoRedux?.avatarUrl || null}
          style={styles.avatar}
        >
          {!userInfoRedux?.avatarUrl && userInfoRedux?.username?.charAt(0)}
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
            name: "name",
            value: userInfo.name,
            editable: true,
          },
          {
            label: "Time Zone",
            name: "timeZone",
            value: userInfo.timeZone,
            editable: false,
          },
          {
            label: "Language",
            name: "language",
            value: userInfo.language,
            editable: false,
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
            {isEditing && field.editable ? (
              <TextField
                name={field.name}
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
        {/* Error Message */}
        {errorMessage && (
          <Box textAlign="center" padding="20px">
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}
        {/* Loading Spinner */}
        {loading && (
          <Box textAlign="center" padding="20px">
            <CircularProgress />
          </Box>
        )}
        {/* Submit Button */}
        {isEditing && !loading && (
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
