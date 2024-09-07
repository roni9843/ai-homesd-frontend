import { Box } from "@mui/material";
import { Inter } from "next/font/google";

import { whiteColor_v_2 } from "../../../color";
import HomePageHeaderReduxWrapped from "./HomePageHeaderReduxWrapped";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sign Up",
//   description: "Sign Up page",
// };

export default function ContactLayout({ children }) {
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

        {children}
      </body>
    </html>
  );
}

//  <HomePageHeader></HomePageHeader>
