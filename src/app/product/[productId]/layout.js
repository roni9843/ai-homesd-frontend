// import CateAndProductList from "@/app/components/CateAndProductList/CateAndProductList";
import Footer from "@/app/components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.css";
import { whiteColor_v_2 } from "../../../../color";
import HomePageHeaderReduxWrapped from "./HomePageHeaderReduxWrapped";
//import { Inter } from "next/font/google";
// import HomePageHeaderReduxWrapped from "./HomePageHeaderReduxWrapped";

//const inter = Inter({ subsets: ["latin"] });

export default function ProductLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: whiteColor_v_2 }}>
        <HomePageHeaderReduxWrapped></HomePageHeaderReduxWrapped>

        <div className=""></div>
        {children}

        <div className="mt-3">
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}

//
//  <CateAndProductList></CateAndProductList>
