"use client";
// src/app/page.js
import { Provider } from "react-redux";
import { whiteColor_v_2 } from "../../color";
import CategoryProductList from "./components/CategoryProductList";
import CategoryUiSection from "./components/CategoryUiSection/CategoryUiSection";
import DiscoverMoreTitle from "./components/DiscoverMoreTitle/DiscoverMoreTitle";
import ExclusiveItemsPoster from "./components/ExclusiveItemsPoster/ExclusiveItemsPoster";
import Footer from "./components/Footer/Footer";
import HomePageBanner from "./components/HomePageBanner/HomePageBanner";
import HomePageHeader from "./components/HomePageHeader/HomePageHeader";
import NewArrivalsUiSection from "./components/NewArrivalsUiSection/NewArrivalsUiSection";
import ProductListUiComponent from "./components/ProductListUiComponent/ProductListUiComponent";
import SinglePoster from "./components/SinglePoster/SinglePoster";
import WeeklyOffers from "./components/WeeklyOffers/WeeklyOffers";
import "./globals.css";
import { store } from "./redux/store";

const Home = () => {
  return (
    <Provider store={store}>
      <main className="" style={{ backgroundColor: whiteColor_v_2 }}>
        <HomePageHeader></HomePageHeader>
        <HomePageBanner></HomePageBanner>
        <CategoryUiSection></CategoryUiSection>
        <NewArrivalsUiSection></NewArrivalsUiSection>
        <WeeklyOffers></WeeklyOffers>
        <ExclusiveItemsPoster></ExclusiveItemsPoster>
        <CategoryProductList></CategoryProductList>
        <DiscoverMoreTitle></DiscoverMoreTitle>

        <SinglePoster
          ImageLink={"https://i.ibb.co/Kssr3Qz/Group-11.png"}
        ></SinglePoster>
        <ProductListUiComponent></ProductListUiComponent>

        <div className="mt-5">
          <Footer></Footer>
        </div>
      </main>
    </Provider>
  );
};

export default Home;

// <CateAndProductList></CateAndProductList>
