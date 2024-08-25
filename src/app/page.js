"use client";
// src/app/page.js
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { whiteColor_v_2 } from "../../color";
import CategoryProductList from "./components/CategoryProductList";
import DiscoverMoreTitle from "./components/DiscoverMoreTitle/DiscoverMoreTitle";
import ExclusiveItemsPoster from "./components/ExclusiveItemsPoster/ExclusiveItemsPoster";
import Footer from "./components/Footer/Footer";
import HomePageBanner from "./components/HomePageBanner/HomePageBanner";
import CustomerHeader from "./components/HomePageHeader/CustomerHeader";
import InfoBar from "./components/InfoBar/InfoBar";
import NewArrivalsUiSection from "./components/NewArrivalsUiSection/NewArrivalsUiSection";
import ProductListUiComponent from "./components/ProductListUiComponent/ProductListUiComponent";
import SinglePoster from "./components/SinglePoster/SinglePoster";
import WeeklyOffers from "./components/WeeklyOffers/WeeklyOffers";
import "./globals.css";
import { store } from "./redux/store";

const Home = () => {
  return (
    <Provider store={store}>
      <InfoBar />
      <CustomerHeader></CustomerHeader>
      <Box
        component="main"
        sx={{
          backgroundColor: whiteColor_v_2,
          padding: { xs: "0", lg: "0 50px" }, // No padding on small screens, padding on large screens
        }}
      >
        <HomePageBanner />
        <NewArrivalsUiSection />
        <ExclusiveItemsPoster />
        <WeeklyOffers />

        <CategoryProductList />
        <DiscoverMoreTitle />

        <SinglePoster ImageLink={"https://i.ibb.co/Kssr3Qz/Group-11.png"} />
        <ProductListUiComponent />

        <Box className="mt-5">
          <Footer />
        </Box>
      </Box>
    </Provider>
  );
};

export default Home;

//  <HomePageHeader />
//   <CategoryUiSection />
