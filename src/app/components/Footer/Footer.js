// components/Footer.js
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { blackColor, whiteColor_v_3 } from "../../../../color";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      <div
        className="my-4"
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: whiteColor_v_3,
        }}
      ></div>

      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-unstyled">
              <li>
                <div>Product & Service</div>
              </li>
              <li>
                <div>Shop</div>
              </li>
              <li>
                <div>Support</div>
              </li>
              <li>
                <div>Account</div>
              </li>
              <li>
                <div> About Us </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <p
              style={{
                margin: 0,
              }}
            >
              &copy; 2024 EE Corp. All rights reserved.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <a
              href="https://www.facebook.com"
              style={{
                margin: "0 10px",
                color: blackColor,
                fontSize: "24px",
                textDecoration: "none",
              }}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com"
              style={{
                margin: "0 10px",
                color: blackColor,
                fontSize: "24px",
                textDecoration: "none",
              }}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.twitter.com"
              style={{
                margin: "0 10px",
                color: blackColor,
                fontSize: "24px",
                textDecoration: "none",
              }}
            >
              <TwitterIcon />
            </a>
            <a
              href="https://www.whatsapp.com"
              style={{
                margin: "0 10px",
                color: blackColor,
                fontSize: "24px",
                textDecoration: "none",
              }}
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col d-flex justify-content-center">
            <a
              href="/privacy"
              style={{
                margin: "0 10px",
                color: blackColor,
                textDecoration: "none",
              }}
            >
              Privacy
            </a>
            <a
              href="/terms"
              style={{
                margin: "0 10px",
                color: blackColor,
                textDecoration: "none",
              }}
            >
              Terms and Conditions
            </a>
            <a
              href="/legal"
              style={{
                margin: "0 10px",
                color: blackColor,
                textDecoration: "none",
              }}
            >
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
