"use client";
import CustomerHeader from "@/app/components/HomePageHeader/CustomerHeader";
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";

export default function HomePageHeaderReduxWrapped() {
  return (
    <Provider store={store}>
      <CustomerHeader></CustomerHeader>
    </Provider>
  );
}
//   <HomePageHeader></HomePageHeader>
