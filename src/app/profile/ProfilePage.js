// pages/profile.js
"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { whiteColor_v_2 } from "../../../color";

export default function ProfilePage({ setPageState }) {
  const userInfo = useSelector((state) => state.users.userInfo);

  const [username, setUsername] = useState(userInfo?.username);
  const [email, setEmail] = useState(userInfo?.email);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);

  const profileStyles = {
    container: {
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "0 auto",
      backgroundColor: whiteColor_v_2,
    },
    profileImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      color: "#fff",
      margin: "20px auto",
    },
    formGroup: {
      marginBottom: "15px",
    },
    formLabel: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    formControl: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #000",
      marginBottom: "5px",
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
    },
    inputGroupText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      cursor: "pointer",
    },
    editIcon: {
      cursor: "pointer",
      color: "#007bff",
    },
    saveButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#000",
      borderColor: "#000",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
    },
    link: {
      display: "block",
      textAlign: "center",
      marginTop: "10px",
      textDecoration: "none",
      color: "#000",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
    },
    footerLink: {
      margin: "0 10px",
      color: "#000",
      textDecoration: "none",
    },
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuStyles, setMenuStyles] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={profileStyles.container}>
      <div
        className="mx-2 d-flex justify-content-end"
        style={{ position: "relative" }}
      >
        <MoreVertIcon onClick={handleMenuClick} style={{ cursor: "pointer" }} />
        {anchorEl && (
          <div
            ref={menuRef}
            className="dropdown-menu show"
            style={{
              position: "absolute",
              top: 0,
              left: menuStyles.left,
            }}
          >
            <button
              onClick={() => setPageState("EditProfile")}
              className="dropdown-item"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>MY ACCOUNT</h2>
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          color: "#fff",
          margin: "20px auto",
        }}
      >
        {username?.charAt(0)}
      </div>
      <form>
        <div style={profileStyles.formGroup}>
          <label style={profileStyles.formLabel}>Username</label>
          <div style={profileStyles.inputGroup}>
            <input
              readOnly
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={profileStyles.formControl}
            />
          </div>
        </div>
        <div style={profileStyles.formGroup}>
          <label style={profileStyles.formLabel}>Email</label>
          <div style={profileStyles.inputGroup}>
            <input
              readOnly
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={profileStyles.formControl}
            />
          </div>
        </div>
        <div style={profileStyles.formGroup}>
          <label style={profileStyles.formLabel}>Phone</label>
          <div style={profileStyles.inputGroup}>
            <input
              readOnly
              type={"number"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={profileStyles.formControl}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
