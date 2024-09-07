"use client";

import CustomerHeader from "@/app/components/HomePageHeader/CustomerHeader";
import InfoBar from "@/app/components/InfoBar/InfoBar";
import { store } from "@/app/redux/store";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { whiteColor_v_2 } from "../../../color";

export default function HomePageHeaderReduxWrapped() {
  return (
    <Provider store={store}>
      <Box
        component="main"
        sx={{
          backgroundColor: whiteColor_v_2,
          padding: { xs: "0", lg: "5px 50px" }, // No padding on small screens, padding on large screens
          backgroundColor: "black",
        }}
      >
        <InfoBar />
      </Box>

      <Box
        component="main"
        sx={{
          backgroundColor: whiteColor_v_2,
          padding: { xs: "0", lg: "0 50px" }, // No padding on small screens, padding on large screens
          backgroundColor: "white",
        }}
      >
        <CustomerHeader></CustomerHeader>
      </Box>
    </Provider>
  );
}
//   <HomePageHeader></HomePageHeader>