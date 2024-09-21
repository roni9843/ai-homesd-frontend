"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "40px 0",
        backgroundColor: "#454545",
        color: "white",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 style={{ fontWeight: "bold" }}>ABOUT</h5>
            <div
              className="line-divider"
              style={{
                width: "30px",
                height: "2px",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            ></div>
            <p>
              Aihomesd Food Service is a leading business that delivers natural,
              healthy, and chemical-free food to people.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a
                href="https://www.facebook.com"
                style={{
                  margin: "0 10px",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com"
                style={{
                  margin: "0 10px",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com"
                style={{
                  margin: "0 10px",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.youtube.com"
                style={{
                  margin: "0 10px",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Information Section */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 style={{ fontWeight: "bold" }}>INFORMATION</h5>
            <div
              className="line-divider"
              style={{
                width: "30px",
                height: "2px",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            ></div>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/wishlist"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/refund"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Refund and Returns
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 style={{ fontWeight: "bold" }}>COMPANY</h5>
            <div
              className="line-divider"
              style={{
                width: "30px",
                height: "2px",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            ></div>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/about"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/ceo"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  CEO Message
                </a>
              </li>
              <li>
                <a
                  href="/coo"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  COO Message
                </a>
              </li>
              <li>
                <a
                  href="/cmo"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  CMO Message
                </a>
              </li>
            </ul>
          </div>

          {/* Facebook Section */}
          <div className="col-md-3 mb-4 mb-md-0 d-flex justify-content-center">
            <div>
              <h5 style={{ fontWeight: "bold" }}>LIKE US ON FACEBOOK</h5>
              <div
                className="line-divider"
                style={{
                  width: "30px",
                  height: "2px",
                  backgroundColor: "white",
                  marginBottom: "10px",
                }}
              ></div>
              <div className="d-flex justify-content-center">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/LogicLark&tabs=timeline&width=250&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="250"
                  height="300"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row mt-4 text-center">
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-center justify-content-lg-start align-items-start">
              <p
                style={{
                  margin: 0,
                  color: "white",
                }}
              >
                &copy; 2024 aihomesd. All rights reserved.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-center justify-content-lg-end align-items-end">
              <p
                style={{
                  margin: 0,
                  color: "white",
                }}
              >
                Developed by{" "}
                <a
                  href="https://araflogix.com/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  ArafLogix.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .line-divider {
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media (min-width: 768px) {
          .line-divider {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
