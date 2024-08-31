"use client";

import CategoryProductList from "@/app/components/CategoryProductList";
import ExclusiveItemsPoster from "@/app/components/ExclusiveItemsPoster/ExclusiveItemsPoster";
import { addToCart } from "@/app/redux/userSlice";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import StickyBox from "react-sticky-box";
import {
  blackColor,
  grayColor,
  redColor,
  whiteColor,
  whiteColor_v_2,
  whiteColor_v_3,
} from "../../../../color";
import ProductCarousel from "./ProductCarousel";

export default function SingleProductPage({ productData }) {
  const [showMore, setShowMore] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  if (!productData) {
    return <div>Product not found</div>;
  }

  const htmlText = productData.productDescription;

  const discountPercentage = productData.productOffer;
  const discountedPrice =
    productData.productRegularPrice * (1 - discountPercentage / 100);

  return (
    <>
      <Head>
        <title>My E-commerce Site 22</title>
        <meta property="og:image" content={productData.images[0]} />
      </Head>

      <div style={{ display: "flex", flexWrap: "wrap", margin: 0, padding: 0 }}>
        <div style={{ flex: "1 1 50%" }}>
          <StickyBox offsetTop={20} offsetBottom={20}>
            <ProductCarousel images={productData} />
          </StickyBox>
          <div
            style={{
              height: "5px",
              width: "100%",
              backgroundColor: whiteColor_v_3,
            }}
          ></div>
        </div>

        <div style={{ flex: "1 1 50%", padding: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ color: "#666", fontSize: 14 }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: blackColor,
                  marginBottom: 10,
                }}
              >
                {productData.productName}
              </span>
              <span
                style={{
                  marginLeft: "20px",
                  backgroundColor: redColor,
                  color: whiteColor,
                  borderRadius: "5px",
                  padding: "3px 8px",
                }}
              >
                On sell
              </span>
            </div>
            <div>
              <FavoriteBorderIcon />
            </div>
          </div>

          <div
            className="mt-3"
            style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
          >
            <div>
              <span style={{ fontSize: 24, color: blackColor }}>
                ৳{discountedPrice.toFixed(2)}
              </span>
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: 14,
                  color: grayColor,

                  textDecoration: "line-through",
                  marginRight: "10px",
                }}
              >
                ৳{productData.productRegularPrice.toFixed(2)}
              </span>
            </div>

            <span
              style={{
                fontSize: 15,
                color: blackColor,
                padding: 5,
                marginLeft: 10,
                backgroundColor: "#14FF00",
              }}
            >
              {discountPercentage}% OFF
            </span>
          </div>
          <div
            style={{
              height: "5px",
              width: "100%",
              backgroundColor: whiteColor_v_3,
            }}
          ></div>

          <div
            style={{
              display: "none",
              // display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0f2f4",
              borderRadius: 5,
              textAlign: "center",
              padding: 10,
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 16, color: "#666" }}>Average rating:</span>
            <span
              style={{
                color: "#f90",
                fontSize: 20,
                fontWeight: "bold",
                margin: "0 10px",
              }}
            >
              ⭐⭐⭐⭐⭐
            </span>
            <span style={{ fontSize: 16, color: "#666" }}>(5 reviews)</span>
          </div>

          <div className="my-3">
            {showMore ? (
              <div
                style={{
                  position: "relative",
                  height: 100,
                  overflow: "hidden",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: htmlText }} />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 100,
                    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0),${whiteColor_v_2})`,
                  }}
                ></div>
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div dangerouslySetInnerHTML={{ __html: htmlText }} />
              </div>
            )}
            <button
              style={{
                alignSelf: "center",
                backgroundColor: grayColor,
                color: whiteColor,
                border: "none",
                padding: "5px 5px",
                fontSize: 10,
                borderRadius: 30,
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                alignContent: "center",
                margin: "0px auto",
                display: "flex",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show more" : "Hide"}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <button
              className="btn   button-opacityNormal"
              onClick={() => {
                const payload = productData;
                dispatch(addToCart(payload));
              }}
              style={{
                backgroundColor: blackColor,
                color: whiteColor,
                border: "none",
                padding: "12px 25px",
                fontSize: 16,
                borderRadius: 20,
                cursor: "pointer",
                marginRight: 10,
                transition: "background-color 0.3s ease, transform 0.1s ease", // Enhanced transition
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddShoppingCartTwoToneIcon
                style={{ color: whiteColor, marginRight: 8 }}
              />
              Add to Cart
            </button>

            <button
              className="btn   "
              onClick={() => {
                const payload = productData;
                dispatch(addToCart(payload));
                router.push("/productCart");
              }}
              style={{
                border: `2px solid ${"#FFA500"}`,
                color: "#FFA500",
                padding: "12px 25px",
                fontWeight: "bold",
                fontSize: 16,
                borderRadius: 20,
                cursor: "pointer",
                marginRight: 10,
                transition: "background-color 0.3s ease, transform 0.1s ease", // Enhanced transition
                display: "flex",
                alignItems: "center",
              }}
            >
              <ShoppingBasketTwoToneIcon
                style={{ color: "#FFA500", marginRight: 8 }}
              />
              Order Now
            </button>
          </div>
        </div>
      </div>
      <CategoryProductList></CategoryProductList>
      <ExclusiveItemsPoster />
    </>
  );
}

/**
 * 
 * <DiscoverMoreTitle></DiscoverMoreTitle>
 * 
 *  <SinglePoster
        ImageLink={"https://i.ibb.co/Kssr3Qz/Group-11.png"}
      ></SinglePoster>

 <ProductListUiComponent></ProductListUiComponent>
 *  */
