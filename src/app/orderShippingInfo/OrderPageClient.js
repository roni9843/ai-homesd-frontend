"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Order from "./Order";

export default function OrderPageClient() {
  const userInfo = useSelector((state) => state.users.userInfo);

  const [fetchOrder, setFetchOrder] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [orderCancel, setOrderCancel] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuStyles, setMenuStyles] = useState({});
  const menuRef = useRef(null);

  const [pageState, setPageState] = useState("Con_order");

  useEffect(() => {
    fetchData();
  }, [userInfo]);

  useLayoutEffect(() => {
    if (anchorEl && menuRef.current) {
      const { bottom, left } = anchorEl.getBoundingClientRect();
      setMenuStyles({
        top: bottom + window.scrollY,
        left: left + window.scrollX - menuRef.current.offsetWidth,
      });
    }
  }, [anchorEl]);

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
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
              className="dropdown-item"
              onClick={() => setPageState("Con_order")}
            >
              Processing Order
            </button>
            <button
              className="dropdown-item"
              onClick={() => setPageState("Complete_order")}
            >
              Complete Order
            </button>
            <button
              className="dropdown-item"
              onClick={() => setPageState("Cancel_order")}
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>

      {pageState === "Complete_order" && (
        <div>
          <div>
            {completeOrder?.map((or) => (
              <Order key={or._id} orderDetails={or} userInfo={userInfo} />
            ))}
          </div>
        </div>
      )}
      {pageState === "Cancel_order" && (
        <div>
          <div>
            {orderCancel?.map((or) => (
              <Order key={or._id} orderDetails={or} userInfo={userInfo} />
            ))}
          </div>
        </div>
      )}

      {pageState === "Con_order" && (
        <div>
          {fetchOrder?.map((or) => (
            <Order key={or._id} orderDetails={or} userInfo={userInfo} />
          ))}
        </div>
      )}
    </div>
  );
}
