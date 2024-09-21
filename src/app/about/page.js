import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

export default function AboutPage() {
  return (
    <Container>
      {/* Section 1: Hero Section with Image */}
      <Box
        sx={{
          backgroundImage:
            "url(https://i.ibb.co/FmwMRqM/pexels-cottonbro-5532664.jpg)", // Use the correct image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
          color: "#fff",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          About Us
        </Typography>
      </Box>

      {/* Section 2: Who We Are */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Who We Are
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, textAlign: "justify" }}
          >
            We are a passionate team committed to delivering high-quality
            products and services to meet the evolving needs of our customers.
            With a focus on innovation, excellence, and customer satisfaction,
            we strive to make a difference in the industry by offering reliable,
            efficient, and user-friendly solutions. Our goal is to consistently
            exceed expectations and provide value that goes beyond products.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Avatar
            src="https://i.ibb.co/bH8bTRD/pexels-blitzboy-1040881.jpg"
            alt="Our Team"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 5 }} />

      {/* Section 3: Vision and Mission */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Our Vision & Mission
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, textAlign: "justify", mb: 3 }}
        >
          Our vision is to become a global leader in our industry by offering
          unparalleled solutions that transform the way people interact with
          technology. We aim to be at the forefront of innovation, setting new
          standards of quality and excellence.
          <br />
          <br />
          Our mission is to empower businesses and individuals through
          cutting-edge products and services that drive growth, efficiency, and
          success. We are committed to delivering superior customer experiences
          by ensuring our solutions meet the highest standards of reliability
          and performance.
        </Typography>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Section 4: What We Offer */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              High-Quality Products
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Our products are crafted with the utmost attention to detail,
              ensuring quality that you can rely on. We offer a wide range of
              solutions designed to meet the specific needs of our customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              Exceptional Service
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              We believe that great service goes hand-in-hand with great
              products. Our team is dedicated to providing top-notch customer
              support, ensuring a seamless experience from start to finish.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              Continuous Innovation
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Innovation is at the core of everything we do. We are constantly
              exploring new ideas and technologies to improve our offerings and
              stay ahead of industry trends.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Section 5: Meet Our Team */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Avatar
              src="https://i.ibb.co/SP8fGZG/pexels-tony-james-andersson-249384-1674752.jpg"
              alt="John Doe"
              sx={{
                width: 150,
                height: 150,
                mb: 2,
                mx: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
            <Typography align="center" variant="h6" sx={{ fontWeight: 500 }}>
              John Doe
            </Typography>
            <Typography align="center" variant="body2">
              CEO & Founder
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Avatar
              src="https://via.placeholder.com/150"
              alt="Jane Smith"
              sx={{
                width: 150,
                height: 150,
                mb: 2,
                mx: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
            <Typography align="center" variant="h6" sx={{ fontWeight: 500 }}>
              Jane Smith
            </Typography>
            <Typography align="center" variant="body2">
              Chief Marketing Officer
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Avatar
              src="https://i.ibb.co/bH8bTRD/pexels-blitzboy-1040881.jpg"
              alt="Alex Johnson"
              sx={{
                width: 150,
                height: 150,
                mb: 2,
                mx: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
            <Typography align="center" variant="h6" sx={{ fontWeight: 500 }}>
              Alex Johnson
            </Typography>
            <Typography align="center" variant="body2">
              Lead Developer
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
