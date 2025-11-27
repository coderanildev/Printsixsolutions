import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";

const About = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#020817",
        minHeight: "100vh",
        color: "white",
        py: 8,
        px: { xs: 3, sm: 6, md: 10 },
      }}
    >
      {/* ---- Header Section ---- */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#fc9b04",
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 700,
            mx: "auto",
            color: "#ccc",
            lineHeight: 1.6,
          }}
        >
          Welcome to <strong style={{ color: "#fc9b04" }}>ShopEase</strong> —
          your one-stop destination for stylish, affordable, and quality
          products. We believe shopping should be easy, fun, and reliable.
        </Typography>
      </Box>

      {/* ---- Mission Section ---- */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
            alt="Our Mission"
            style={{
              width: "100%",
              borderRadius: "20px",
              boxShadow: "0px 0px 15px rgba(252,155,4,0.3)",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "#fc9b04", mb: 2 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ color: "#ccc", lineHeight: 1.8 }}>
            Our mission is to bring the best online shopping experience right to
            your fingertips. From trending fashion and electronics to lifestyle
            essentials, we carefully curate every product to meet the highest
            standards of quality and affordability.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fc9b04",
              color: "black",
              fontWeight: "bold",
              mt: 3,
              "&:hover": { backgroundColor: "#ffb733" },
            }}
          >
            Explore Our Collection
          </Button>
        </Grid>
      </Grid>

      {/* ---- Features Section ---- */}
      <Box mt={10} textAlign="center">
        <Typography
          variant="h4"
          sx={{ color: "#fc9b04", fontWeight: "bold", mb: 4 }}
        >
          Why Shop With Us?
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#1f2937",
                borderRadius: "15px",
                p: 3,
                boxShadow: "0px 0px 10px rgba(252,155,4,0.2)",
                height: "100%",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#fc9b04",
                    width: 60,
                    height: 60,
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <ShoppingBagIcon sx={{ fontSize: 35, color: "black" }} />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fc9b04", mb: 1 }}
                >
                  Premium Quality
                </Typography>
                <Typography variant="body2" sx={{ color: "#ccc" }}>
                  We handpick the finest products from trusted brands to ensure
                  you get nothing but the best.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#1f2937",
                borderRadius: "15px",
                p: 3,
                boxShadow: "0px 0px 10px rgba(252,155,4,0.2)",
                height: "100%",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#fc9b04",
                    width: 60,
                    height: 60,
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <LocalShippingIcon sx={{ fontSize: 35, color: "black" }} />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fc9b04", mb: 1 }}
                >
                  Fast & Secure Delivery
                </Typography>
                <Typography variant="body2" sx={{ color: "#ccc" }}>
                  Your orders are packed with care and shipped quickly to your
                  doorstep with reliable partners.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#1f2937",
                borderRadius: "15px",
                p: 3,
                boxShadow: "0px 0px 10px rgba(252,155,4,0.2)",
                height: "100%",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#fc9b04",
                    width: 60,
                    height: 60,
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 35, color: "black" }} />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fc9b04", mb: 1 }}
                >
                  100% Satisfaction
                </Typography>
                <Typography variant="body2" sx={{ color: "#ccc" }}>
                  We value our customers and offer easy returns, refunds, and
                  top-notch support for every purchase.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* ---- Footer Section ---- */}
      <Divider sx={{ my: 8, backgroundColor: "#333" }} />
      <Box textAlign="center">
        <Typography variant="body2" sx={{ color: "#777" }}>
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
