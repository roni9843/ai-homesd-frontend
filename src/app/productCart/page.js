 "use client";


 import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CircularProgress from "@mui/material/CircularProgress"; // Importing spinner
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blackColor,
  grayColor,
  whiteColor,
  whiteColor_v_2,
  whiteColor_v_3,
} from "../../../color";

import {
  addShippingCostAndDiscountAndCouponCode,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/userSlice";
import { Box, Table } from "@mui/material";
//import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import Coupon from "./Coupon";
import Shipping from "./Shipping";




export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.users.cart);
  const userInfo = useSelector((state) => state.users.userInfo);
  const AllProduct = useSelector((state) => state.users.AllProduct);
  const discountRateRedux = useSelector((state) => state.users.discountRate);
  const [isHovered, setIsHovered] = useState(false);
  const [discountRate, setDiscountRate] = useState(discountRateRedux);
  const shippingCostRedux = useSelector((state) => state.users.shippingCost);
  const [shippingCost, setShippingCost] = useState({
    value: shippingCostRedux.value,
    state :  shippingCostRedux.state
  });
  const [couponCode,setCouponCode] = useState(null)

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

    const payload = {shippingCost,couponCode,discountRate};


   dispatch(addShippingCostAndDiscountAndCouponCode(payload));



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


  const [totalPrice,setTotalPrice] = useState(0)




  useEffect(()=>{

    setTotalPrice(cart
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
      .toFixed(2))


  },[cart])



  return (
    <Box
      // style={{
      //   padding: "10px 5px",

      //   // maxWidth: "800px",

      //   margin: "0 auto",
      // }}

      sx={{
        backgroundColor: whiteColor_v_2,
        padding: { xs: "0", lg: "5px 50px" }, // No padding on small screens, padding on large screens
        //  backgroundColor: "black",
      }}
    >
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
        <div className="row px-0 mx-0 mt-3">
          <div
            className="mb-3 "
            style={{ textAlign: "center", fontSize: "24px" }}
          >
            <span>My </span>
            <span style={{ fontWeight: "bold" }}>Card list</span>
          </div>

          <div className="col-12 col-md-6 col-lg-6">
            <Box
              sx={{
                display: { xs: "flex", lg: "none" }, // Hide on extra small and small screens, show on large and above
                flexDirection: "column",
                gap: "20px",
              }}
            >
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
                    onClick={()=> router.push(`/product/${item._id}`) }
                      unoptimized
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
                          <span onClick={() => router.push(`/product/${item._id}`)} style={{ fontSize: "14px" }}>
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
            </Box>

            <Box
              sx={{
                display: { xs: "none", lg: "flex" }, // Hide on extra small and small screens, show on large and above
                flexDirection: "column",
                gap: "20px",
              }}
            >


              <table className="" style={{ backgroundColor: "transparent", width: "100%" }}>
                <thead>
                  <tr>
                    <th scope="col" style={{ borderBottom: "2px solid gray", padding: "10px" }}>PRODUCT</th>
                    <th scope="col" style={{ borderBottom: "2px solid gray", padding: "10px" }}>PRICE</th>
                    <th scope="col" style={{ borderBottom: "2px solid gray", padding: "10px" }}>QUANTITY</th>
                    <th scope="col" style={{ borderBottom: "2px solid gray", padding: "10px" }}>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td className="pt-2" style={{ padding: "10px", display: "flex", alignItems: "center" }}>
                        <button
                          onClick={() => handleRemove(item._id)}
                          style={{
                            cursor: "pointer",
                            color: "black",
                            border: "none",
                            fontWeight: "bold",
                            background: "transparent",
                            transition: "transform 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          <CloseTwoToneIcon />
                        </button>
                        <Image
                        onClick={()=> router.push(`/product/${item._id}`)}
                          src={item.images[0]}
                          alt={item.productName}
                          height={100}
                          width={100}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginLeft: "10px",
                          }}
                        />
                        <span
                        onClick={()=> router.push(`/product/${item._id}`)}
                          style={{
                            marginLeft: "10px",
                            fontSize: "14px",
                            maxWidth: "150px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                            transition: "color 0.2s",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "blue"; // Change color on hover
                            e.currentTarget.style.height = "auto"; // Adjust height
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "initial"; // Reset color
                          }}
                        >
                          {item.productName}
                        </span>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          ৳
                          {item.productOffer
                            ? (
                              item.productRegularPrice.toFixed(2) *
                              (1 - item.productOffer / 100)
                            ).toFixed(2)
                            : item.productRegularPrice.toFixed(2)}
                        </span>
                      </td>
                      <td style={{ padding: "10px" }}>
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
                          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
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
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          ৳
                          {((item.productOffer
                            ? item.productRegularPrice * (1 - item.productOffer / 100)
                            : item.productRegularPrice) * item.quantity).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </div>

          <div className="col-12 col-md-6 col-lg-6">
            <table style={{ backgroundColor: "transparent", width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      borderBottom: "2px solid gray",
                      padding: "10px",
                      textAlign: "left",
                    //  fontSize: "18px",
                     // fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    

                  CART TOTALS
                  </th>
             
                </tr>
              </thead>
            </table>

         

            {/* Subtotal */}
            <div className="mt-3" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "5px 0" }}>
              <span style={{fontWeight: "bold"}}>Subtotal:</span>
              <span style={{ fontWeight: "bold" }}>৳ {totalPrice}</span>
            </div>

            {
              discountRate > 0 &&   <div className="mt-0" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "5px 0" }}>
              <span style={{fontWeight: "bold"}}>Coupon Discount:</span>
              <span style={{ fontWeight: "bold" }}>- ৳ {discountRate}</span>
              </div>
            }
          

            <div className="" style={{ height: "1px", width: "100%", backgroundColor: "gray", opacity: "0.5" }}></div>

          
           <Shipping setShippingCost={setShippingCost}></Shipping>


            {/* Total */}
          

            
            <div className="mt-0" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "5px 0" }}>
            <span style={{fontWeight: "bold"}}>Total:</span>
            <span style={{ fontWeight: "bold" }}>৳ { ((totalPrice - discountRate) + shippingCost.value).toFixed(2) }</span>
            </div>

          <div className="" style={{ height: "1px", width: "100%", backgroundColor: "gray", opacity: "0.5" }}></div>
          {/* Cash On Delivery */}
          <div className="my-2" style={{ display: "flex", justifyContent: "flex-end", fontSize: "14px", padding: "0px 0" }}>
          <span>Cash On Delivery (COD)</span>
        </div>

            {/* Proceed to Checkout Button */}
            <div>
              <div className="" style={{ 
                
                //display: "flex",
                
                //justifyContent: "flex-end" 
              
              }}>
                <button
                  className="btn button-opacityNormal"
                  onClick={handleOrder}
                  style={{
                    backgroundColor: "black",
                    padding: "10px 15px",
                    borderRadius: "25px",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.1s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width:"100%"
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" style={{ marginRight: "10px" }} />
                  ) : (
                    `PROCESS TO CHECKOUT`
                  )}
                </button>
              </div>
            </div>


           

           

            {/* Coupon Input */}
          <Coupon setCouponCodeText={setCouponCode} setDiscountRate={setDiscountRate} setIsHovered={setIsHovered} isHovered={isHovered} 
          ></Coupon>
          </div>



        </div>
      </div>
    )}
    </Box>
  );
}



