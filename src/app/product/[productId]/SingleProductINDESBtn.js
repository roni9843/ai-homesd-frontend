"use client";

import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/app/redux/userSlice";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SingleProductINDESBtn({ productData }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // Initialize quantity state
  const [quantity, setQuantity] = useState(1);

  // Update localStorage and Redux when quantity changes
  const updateCart = (additionalQuantity = 0) => {
    // Get cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Find the product in the cart
    const existingProductIndex = cartItems.findIndex(
      (item) => item._id === productData._id
    );

    if (existingProductIndex !== -1) {
      // Product exists, increase quantity
      cartItems[existingProductIndex].quantity += additionalQuantity;

      // Dispatch the appropriate action to Redux
      if (additionalQuantity > 0) {
        dispatch(increaseQuantity(productData._id));
      } else if (additionalQuantity < 0) {
        dispatch(decreaseQuantity(productData._id));
      }
    } else {
      // New product, add it with the current quantity
      const newProduct = { ...productData, quantity: 1 };
      cartItems.push(newProduct);

      // Add to Redux as a new product
      dispatch(addToCart(newProduct));
    }

    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // Handle increasing quantity
  const increaseQuantityHandler = () => {
    setQuantity((prev) => prev + 1);
    updateCart(1); // Increase by 1 when clicking "+"
  };

  // Handle decreasing quantity
  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      updateCart(-1); // Decrease by 1 when clicking "-"
    }
  };

  useEffect(() => {
    // Initialize quantity from localStorage if it exists
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProduct = cartItems.find((p) => p._id === productData._id);
    setQuantity(existingProduct ? existingProduct.quantity : 1);
  }, [productData._id]);

  return (
    <div>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 2,
        }}
      >
        {/* Quantity Increase/Decrease buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ddd",
            borderRadius: "30px",
            backgroundColor: "#f7f7f7",
            width: "150px",
            height: "50px",
          }}
        >
          <button
            onClick={decreaseQuantityHandler}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: quantity > 1 ? "pointer" : "not-allowed",
            }}
            disabled={quantity === 1}
          >
            -
          </button>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              borderLeft: "1px solid #ddd",
              borderRight: "1px solid #ddd",
            }}
          >
            {quantity}
          </div>
          <button
            onClick={increaseQuantityHandler}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </Box>

        {/* Add to Cart button */}
        <button
          className="btn button-opacityNormal"
          onClick={() => {
            updateCart(1); // Increase quantity by 1 when clicking Add to Cart
          }}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            padding: "12px 25px",
            fontSize: 16,
            borderRadius: "30px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AddShoppingCartTwoToneIcon
            style={{ color: "white", marginRight: 8 }}
          />
          Add to Cart
        </button>

        {/* Buy Now button */}
        <button
          className="btn"
          onClick={() => {
            updateCart(0); // Use current quantity without incrementing
            router.push("/productCart");
          }}
          style={{
            border: "2px solid black",
            color: "black",
            padding: "12px 25px",
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: "30px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ShoppingBasketTwoToneIcon
            style={{ color: "black", marginRight: 8 }}
          />
          Buy Now
        </button>
      </Box>
    </div>
  );
}
