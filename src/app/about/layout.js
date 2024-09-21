import { Box } from "@mui/material";
import { Inter } from "next/font/google";

import { whiteColor_v_2 } from "../../../color";
import Footer from "../components/Footer/Footer";
import HomePageHeaderReduxWrapped from "./HomePageHeaderReduxWrapped";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sign Up",
//   description: "Sign Up page",
// };

export default function AboutLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: whiteColor_v_2 }}
      >
        <Box
          component="main"
          sx={{
            backgroundColor: whiteColor_v_2,
            //  padding: { xs: "0", lg: "0 50px" }, // No padding on small screens, padding on large screens
            backgroundColor: "white",
          }}
        >
          <HomePageHeaderReduxWrapped></HomePageHeaderReduxWrapped>
        </Box>

        <div className="mt-4">{children}</div>

        <div className="mt-5">
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}

//  <HomePageHeader></HomePageHeader>
