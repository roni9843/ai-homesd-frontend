"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  grayColor,
  whiteColor,
  whiteColor_v_2,
  whiteColor_v_3,
} from "../../../color";
import { setUserEmail, setUserInfo } from "../redux/userSlice";

export default function LoginPage({ setAuthState }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://elec-ecommerce-back.vercel.app/login",
        {
          email,
          password,
        }
      );
      const { token } = data;

      // Store JWT token in localStorage
      localStorage.setItem("token", token);

      document.cookie = `token=${token}`;

      // Decode token to get user info
      const userInfo = await jwtDecode(token);

      const fetchUserInfo = async (userId) => {
        const response = await fetch(
          "https://elec-ecommerce-back.vercel.app/getTheUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const fetchUser = await response.json();

        if (fetchUser) {
          dispatch(setUserInfo(fetchUser.user));
          dispatch(setUserEmail(fetchUser.user.email));

          // Redirect to the intended page or default to home
          const callbackUrl =
            new URLSearchParams(window.location.search).get("callbackUrl") ||
            "/";

          router.push(callbackUrl);
        }
      };

      fetchUserInfo(userInfo.id);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: whiteColor_v_2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <main
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <span
          style={{
            marginBottom: "10px",
            fontSize: "32px",
            fontWeight: "normal",
          }}
        >
          WELCOME <span style={{ fontWeight: "bold" }}>BACK </span>
        </span>
        <p style={{ marginBottom: "30px", fontSize: "14px", color: grayColor }}>
          Faster login, instant access!
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              id="email"
              className="form-control"
              style={{
                backgroundColor: whiteColor,
                borderColor: whiteColor_v_3,
                color: grayColor,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                border: `1px solid ${whiteColor_v_3}`,
              }}
              placeholder="email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              id="password"
              className="form-control"
              style={{
                backgroundColor: whiteColor,
                borderColor: whiteColor_v_3,
                color: grayColor,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                border: `1px solid ${whiteColor_v_3}`,
              }}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{ marginBottom: "20px", textAlign: "left", display: "none" }}
          >
            <label>
              <input type="checkbox" style={{ marginRight: "10px" }} />
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-success btn-block button-opacity"
          >
            Log In
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => {
              console.log("this is signup");

              setAuthState("Signup");
            }}
            style={{ color: "#333", fontWeight: "bold" }}
          >
            Sign Up
          </span>
        </p>
      </main>
    </div>
  );
}

/**  <Link
              /// href="/forgot-password"
              style={{ float: "right", color: "#333" }}
            >
              Forget Password?
            </Link> */
