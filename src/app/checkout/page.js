"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blackColor, whiteColor, whiteColor_v_3 } from "../../../color";
import checkGif from "../../../public/check.gif";
import { clearCart } from "../redux/userSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.userInfo);
  const cart = useSelector((state) => state.users.cart);
  const [address, setAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const [userNameState, setUserNameState] = useState("");
  const [userEmailState, setUserEmailState] = useState("");
  const [userPhoneState, setUserPhoneState] = useState("");

  const [isOrderDone, setIsOrderDone] = useState(false);

  const [isPushBack, setIsPushBack] = useState(true);

  useEffect(() => {
    setUserPhoneState(userInfo?.username);
    setUserEmailState(userInfo?.email);
    setUserNameState(userInfo?.phoneNumber);

    console.log("==> ", userInfo);

    if (userInfo?.id) {
      fetchUserInfo(userInfo.id);
    }
  }, [userInfo]);

  const fetchUserInfo = async (userId) => {
    const response = await fetch("https://backend.aihomesd.com/getTheUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    const fetchUser = await response.json();

    if (fetchUser) {
      console.log("888 => ", fetchUser);

      setUserPhoneState(fetchUser.user.username);
      setUserEmailState(fetchUser.user.email);
      setUserNameState(fetchUser.user.phoneNumber);
    }
  };

  // Effect to redirect to home if cart is empty
  useEffect(() => {
    if (isPushBack) {
      if (cart.length === 0) {
        router.push("/");
      }
    }
  }, [cart, router, isPushBack]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      setOrderStatus("Address is required.");
      return;
    }

    const orderDetails = {
      userId: userInfo._id,
      products: cart.map((item) => ({
        product: item._id,
        qty: item.quantity,
      })),
      address,
      totalAmount: cart.reduce(
        (total, item) => total + item.productMRP * item.quantity,
        0
      ),
      paymentMethod: "Cash on Delivery",
    };

    try {
      const response = await fetch("https://backend.aihomesd.com/postOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderStatus("Order placed successfully!");

        setIsOrderDone(true);

        setTimeout(() => {
          router.push("/orderShippingInfo");
          setIsPushBack(false);
          dispatch(clearCart());
        }, 3000);
      } else {
        setOrderStatus("Failed to place order.");
      }
    } catch (error) {
      setOrderStatus("Error: " + error.message);
    }
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {userInfo && (
        <div style={{ display: `${isOrderDone ? "none" : "block"}` }}>
          <span
            style={{
              textAlign: "center",
              color: blackColor,
              marginBottom: "20px",
              fontSize: "24px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Checkout{"  "}
            <span className="px-1" style={{ fontWeight: "bold" }}>
              {" "}
              Details
            </span>
          </span>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  marginBottom: "8px",
                  color: blackColor,
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Name:
              </label>
              <input
                type="email"
                style={{
                  padding: "7px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: blackColor,
                  backgroundColor: whiteColor_v_3,
                  border: "none",
                }}
                value={userNameState}
                readOnly
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  marginBottom: "8px",
                  color: blackColor,
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Email:
              </label>
              <input
                type="email"
                style={{
                  padding: "7px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: blackColor,
                  backgroundColor: whiteColor_v_3,
                  border: "none",
                }}
                value={userEmailState}
                readOnly
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  marginBottom: "8px",
                  color: blackColor,
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Phone Number:
              </label>
              <input
                type="text"
                value={userPhoneState}
                readOnly
                style={{
                  padding: "7px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: blackColor,
                  backgroundColor: whiteColor_v_3,
                  border: "none",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  marginBottom: "8px",
                  color: blackColor,
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Address:
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{
                  padding: "7px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: blackColor,
                  backgroundColor: whiteColor,
                  border: `1px solid ${whiteColor_v_3}`,
                  height: "100px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  marginBottom: "8px",
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Payment Method:
              </label>
              <input
                type="text"
                value="Cash on Delivery"
                readOnly
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  color: "#333",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block button-opacity"
              style={{
                padding: "10px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: blackColor,
                color: whiteColor,
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.1s ease", // Enhanced transition
              }}
            >
              Place Order
            </button>
          </form>
        </div>
      )}

      {isOrderDone && (
        <div className="mt-5 pt-5 d-flex justify-content-center align-items-center ">
          <div
            className="card align-items-center"
            style={{
              width: "300px",
              borderRadius: "10px",
              overflow: "hidden",

              backgroundColor: "#f8faf6",
              border: "none",
            }}
          >
            <Image
              unoptimized
              src={checkGif}
              alt="Order Confirmed"
              //   layout="fill"
              objectFit="cover"
              width={100}
              height={100}
              style={{ borderRadius: "5px" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Order Confirmed!</h5>
              <p className="card-text">Thank you for your purchase.</p>
              <p className="card-text">Please, wait a moment...</p>
            </div>
          </div>
        </div>
      )}

      {orderStatus && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: blackColor,
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {orderStatus}
        </p>
      )}
    </div>
  );
}
