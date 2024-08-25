"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { whiteColor_v_2 } from "../../../color";
import Footer from "../components/Footer/Footer";
import CustomerHeader from "../components/HomePageHeader/CustomerHeader";
import { store } from "../redux/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sign Up",
//   description: "Sign Up page",
// };

export default function SignUpLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body
          className={inter.className}
          style={{ backgroundColor: whiteColor_v_2 }}
        >
          <CustomerHeader></CustomerHeader>

          {children}
          <Footer></Footer>
        </body>
      </Provider>
    </html>
  );
}

//           <HomePageHeader></HomePageHeader>
