"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const [userPhoneState, setUserPhoneState] = useState("");

  const [isOrderDone, setIsOrderDone] = useState(false);
  const [isPushBack, setIsPushBack] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    setUserNameState(userInfo?.username);

    setUserPhoneState(userInfo?.phoneNumber);

    if (userInfo?.id) {
      fetchUserInfo(userInfo.id);
    }
  }, [userInfo]);

  const fetchUserInfo = async (userId) => {
    const response = await fetch("http://localhost:8000/getTheUser", {
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
      setUserPhoneState(fetchUser.user.username);

      setUserNameState(fetchUser.user.phoneNumber);
    }
  };

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

    setIsLoading(true); // Start loading

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
      const response = await fetch("http://localhost:8000/postOrder", {
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
          setIsLoading(false); // Stop loading after redirect
        }, 3000);
      } else {
        setOrderStatus("Failed to place order.");
        setIsLoading(false); // Stop loading on failure
      }
    } catch (error) {
      setOrderStatus("Error: " + error.message);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="checkout-page">
      <style jsx>{`
        .checkout-page {
          margin: 0 auto;
          padding: 20px;
          max-width: 600px;
          width: 100%;
        }

        .checkout-title {
          text-align: center;
          color: #000;
          margin-bottom: 20px;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .checkout-title-bold {
          padding-left: 5px;
          font-weight: bold;
        }

        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .checkout-field {
          display: flex;
          flex-direction: column;
        }

        .checkout-label {
          margin-bottom: 8px;
          color: #000;
          font-weight: bold;
          font-size: 15px;
        }

        .checkout-input {
          padding: 7px;
          border-radius: 5px;
          font-size: 12px;
          color: #000;
          background-color: #f3f3f3;
          border: none;
        }

        .checkout-textarea {
          padding: 7px;
          border-radius: 5px;
          font-size: 12px;
          color: #000;
          background-color: #fff;
          border: 1px solid #f3f3f3;
          height: 100px;
        }

        .checkout-submit {
          padding: 10px;
          border-radius: 20px;
          border: none;
          background-color: ${isLoading ? "#ccc" : "#000"};
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          cursor: ${isLoading ? "not-allowed" : "pointer"};
          transition: background-color 0.3s, transform 0.1s ease;
        }

        .order-confirmation {
          margin-top: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .order-confirmation-card {
          width: 300px;
          border-radius: 10px;
          overflow: hidden;
          background-color: #f8faf6;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .order-status {
          text-align: center;
          margin-top: 20px;
          color: #000;
          font-weight: bold;
          font-size: 16px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .checkout-title {
            font-size: 20px;
          }

          .checkout-label {
            font-size: 14px;
          }

          .checkout-input,
          .checkout-textarea {
            font-size: 14px;
          }

          .checkout-submit {
            font-size: 14px;
          }
        }
      `}</style>

      {userInfo && (
        <div style={{ display: `${isOrderDone ? "none" : "block"}` }}>
          <span className="checkout-title">
            Checkout{"  "}
            <span className="checkout-title-bold">Details</span>
          </span>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-field">
              <label className="checkout-label">Name:</label>
              <input
                type="text"
                className="checkout-input"
                value={userNameState}
                readOnly
              />
            </div>

            <div className="checkout-field">
              <label className="checkout-label">Phone Number:</label>
              <input
                type="text"
                value={userPhoneState}
                readOnly
                className="checkout-input"
              />
            </div>
            <div className="checkout-field">
              <label className="checkout-label">Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="checkout-textarea"
              />
            </div>
            <div className="checkout-field">
              <label className="checkout-label">Payment Method:</label>
              <input
                type="text"
                value="Cash on Delivery"
                readOnly
                className="checkout-input"
              />
            </div>

            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <button type="submit" className="checkout-submit">
                Place Order
              </button>
            )}

            <span>{orderStatus}</span>
          </form>
        </div>
      )}

      {isOrderDone && (
        <div className="order-confirmation">
          <div className="order-confirmation-card">
            <Image src={checkGif} alt="check" width={100} height={100} />
            <span className="order-status">Order Placed Successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}
