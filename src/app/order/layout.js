"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { whiteColor_v_2 } from "../../../color";
import HomePageHeader from "../components/HomePageHeader/HomePageHeader";
import { store } from "../redux/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sign Up",
//   description: "Sign Up page",
// };

export default function CheckoutLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body
          className={inter.className}
          style={{ backgroundColor: whiteColor_v_2 }}
        >
          <HomePageHeader></HomePageHeader>
          {children}
        </body>
      </Provider>
    </html>
  );
}
/**
 *     <Provider store={store}>
        <body className={inter.className}>
          <HomePageHeader></HomePageHeader>
          {children}
        </body>
      </Provider>
 */