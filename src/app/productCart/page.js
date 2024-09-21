"use client";

import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CircularProgress from "@mui/material/CircularProgress"; // Importing spinner
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blackColor,
  grayColor,
  whiteColor,
  whiteColor_v_3,
} from "../../../color";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/userSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.users.cart);
  const userInfo = useSelector((state) => state.users.userInfo);
  const AllProduct = useSelector((state) => state.users.AllProduct);

  const [loading, setLoading] = useState(false); // Loading state

  const handleIncrease = (id) => {
    // Dispatch the action to increase quantity in Redux store
    dispatch(increaseQuantity(id));

    // Retrieve the current cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Find the product by id and increase its quantity
    cartItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    // Save the updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleDecrease = (id) => {
    // Dispatch the action to decrease quantity in Redux store
    dispatch(decreaseQuantity(id));

    // Retrieve the current cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Find the product by id and decrease its quantity, but ensure it stays above 1
    cartItems = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    // Save the updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleRemove = (id) => {
    // Dispatch the action to remove the item from the cart in Redux store
    dispatch(removeFromCart(id));

    // Retrieve the current cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Remove the item by filtering out the one with the matching id
    cartItems = cartItems.filter((item) => item._id !== id);

    // Save the updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleOrder = () => {
    setLoading(true); // Set loading to true when order is initiated

    if (!userInfo) {
      router.push("/login?callbackUrl=/checkout");
    } else {
      router.push("/checkout");
    }

    setLoading(false); // Reset loading state after routing
  };

  // useEffect(() => {
  //   const getFullProductOnCart = cart.filter((c_p) => {
  //     // console.log("this is cart info -> ", c_p);
  //   });
  // }, [cart]);

  // return 0;

  const totalPrice = cart
    .reduce(
      (total, item) =>
        total +
        (item.productOffer
          ? (
              item.productRegularPrice.toFixed(2) *
              (1 - item.productOffer / 100)
            ).toFixed(2)
          : item.productRegularPrice.toFixed(2)) *
          item.quantity,
      0
    )
    .toFixed(2);

  return (
    <div style={{ padding: "10px 5px", maxWidth: "800px", margin: "0 auto" }}>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <ShoppingCartOutlinedIcon
            style={{
              fontSize: "100px",
              color: "#ccc", // You can adjust the color as needed
            }}
          />
          <p style={{ fontSize: "18px", color: "#666" }}>Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <div className="row px-0 mx-0">
            <div className="col-12 col-md-6 col-lg-6">
              <div
                className="mb-3"
                style={{ textAlign: "center", fontSize: "24px" }}
              >
                <span>My </span>
                <span style={{ fontWeight: "bold" }}>Card list</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      // unoptimized
                      src={item.images[0]}
                      alt={item.productName}
                      height={100}
                      width={100}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "20px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="align-self-start">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontSize: "14px" }}>
                            {item.productName}
                          </span>
                          <button
                            onClick={() => handleRemove(item._id)}
                            style={{
                              cursor: "pointer",
                              color: blackColor,
                              border: "none",
                              fontWeight: "bold",
                            }}
                          >
                            <CloseTwoToneIcon />
                          </button>
                        </div>
                        <div>
                          <span
                            style={{
                              fontSize: "11px",
                              color: grayColor,
                            }}
                          >
                            {item.category.category}
                          </span>
                        </div>
                      </div>
                      <div
                        className="align-self-end"
                        style={{
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className="d-flex d-flex align-items-end"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div>
                            <span
                              style={{
                                margin: "0 0 10px 0",
                                fontWeight: "bold",
                              }}
                            >
                              ৳
                              {item.productOffer
                                ? (
                                    item.productRegularPrice.toFixed(2) *
                                    (1 - item.productOffer / 100)
                                  ).toFixed(2)
                                : item.productRegularPrice.toFixed(2)}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <button
                              onClick={() => handleDecrease(item._id)}
                              style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                background: "#ddd",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              -
                            </button>
                            <span
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(item._id)}
                              style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                background: "#ddd",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <div
                className="my-4"
                style={{
                  height: "5px",
                  width: "100%",
                  backgroundColor: whiteColor_v_3,
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span>Subtotal : </span>
                <span style={{ fontWeight: "bold" }}>৳{totalPrice}</span>
              </div>
              <div
                style={{
                  display: "none",
                  // display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span>Delivery Fee : </span>
                <span style={{ fontWeight: "bold" }}>৳5.00</span>
              </div>
              <div>
                <div
                  className="my-3"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="btn button-opacityNormal"
                    onClick={handleOrder}
                    style={{
                      backgroundColor: blackColor,
                      padding: "10px 15px",
                      borderRadius: "25px",
                      color: whiteColor,
                      fontSize: 16,
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition:
                        "background-color 0.3s ease, transform 0.1s ease",
                      display: "flex", // Ensuring the spinner aligns
                      alignItems: "center", // Aligning spinner with text
                      justifyContent: "center",
                    }}
                    disabled={loading} // Disable the button when loading
                  >
                    {loading ? (
                      <CircularProgress
                        size={20}
                        color="inherit"
                        style={{ marginRight: "10px" }}
                      />
                    ) : (
                      `Checkout for ৳${totalPrice}`
                    )}
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  fontSize: 14,
                }}
              >
                <span>Cash On Delivery (COD)</span>
              </div>
              <div
                className="my-4"
                style={{
                  height: "5px",
                  width: "100%",
                  backgroundColor: whiteColor_v_3,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
