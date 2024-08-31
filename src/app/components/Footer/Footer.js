import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "40px 0",
        backgroundColor: "#D18D33", // Similar background color
        color: "white",
      }}
    >
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3">
            <h5 style={{ fontWeight: "bold" }}>ABOUT</h5>
            <div
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
            <div className="d-flex">
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
          <div className="col-md-3">
            <h5 style={{ fontWeight: "bold" }}>INFORMATION</h5>
            <div
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
          <div className="col-md-3">
            <h5 style={{ fontWeight: "bold" }}>COMPANY</h5>
            <div
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
          <div className="col-md-3">
            <h5 style={{ fontWeight: "bold" }}>LIKE US ON FACEBOOK</h5>
            <div
              style={{
                width: "30px",
                height: "2px",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            ></div>
            <div>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/LogicLark&tabs=timeline&width=250&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="150"
                style={{ border: "none", overflow: "hidden", width: "200px" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row mt-4">
          <div className="col text-center">
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
      </div>
    </footer>
  );
};

export default Footer;
