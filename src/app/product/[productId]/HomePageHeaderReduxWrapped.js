"use client";
import HomePageHeader from "@/app/components/HomePageHeader/HomePageHeader";
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";

export default function HomePageHeaderReduxWrapped() {
  return (
    <Provider store={store}>
      <HomePageHeader></HomePageHeader>
    </Provider>
  );
}
