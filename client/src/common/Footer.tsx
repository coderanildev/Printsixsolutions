import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import FooterBlog1 from "../assets/img/footer/footer-blog-1.png";
import FooterBlog2 from "../assets/img/footer/footer-blog-2.png";
import { serviceList_servicePage } from "../config/constants";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#fff" }}>
  {/* Footer Area */}
  <Box className="tp-footer-area-two pt-70 pb-10" sx={{ backgroundColor: "#fff" }}>
    <Container>
      <Grid container spacing={2}>
        {/* Column 1 */}
        <Grid xs={12} sm={6} lg={4}>
          <Box
            className="tp-footer-widget footer-col-1 mb-30 wow fadeInUp"
            data-wow-delay=".3s"
          >
            <Box className="tp-footer-info tp-footer-info-three">
              <Box className="tp-footer-info-logo mb-35">
                <Link to="/">
                  <CardMedia
                    component="img"
                    image="./logo.png"
                    alt="Logo"
                    sx={{ width: "150px" }}
                  />                  
                </Link>
              </Box>
              <Typography variant="body1" sx={{ color: "black", mb: 3 }}>
                UHC is a professional cleaning company providing cleaning
                services throughout British Columbia.
              </Typography>
             <Box
              className=""
              sx={{
                backgroundColor: "white",
                display: "flex",
                gap: 2,
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <a href="https://www.facebook.com/uhcservices/" target="_blank" style={{fontSize:"25px"}}>
                <i className="fab fa-facebook-f" style={{ color: "#1877F2" }}></i>
              </a>
              <a href="https://www.x.com/uhc_services" target="_blank" style={{fontSize:"25px"}}>
                <i className="fab fa-twitter" style={{ color: "#000000" }}></i>
              </a>
              <a href="https://www.instagram.com/uhc_services/" target="_blank" style={{fontSize:"25px"}}>
                <i className="fab fa-instagram" style={{ color: "#E4405F" }}></i>
              </a>
              <a href="https://www.linkedin.com/company/uhc-services/" target="_blank" style={{fontSize:"25px"}}>
                <i className="fab fa-linkedin" style={{ color: "#0A66C2" }}></i>
              </a>
              <a href="https://www.youtube.com/@uhc_services" target="_blank" style={{fontSize:"25px"}}>
                <i className="fab fa-youtube" style={{ color: "#FF0000" }}></i>
              </a>
            </Box>

            </Box>
          </Box>
        </Grid>

        {/* Column 2 */}
        <Grid xs={12} sm={6} lg={4}>
          <Box
            className="tp-footer-widget footer-col-2 mb-30 wow fadeInUp footer-services-sec"
            data-wow-delay=".6s"
          >
            <Typography
              variant="h4"
              className="tp-footer-widget-title mb-35"
              sx={{ color: "#fc9b04" }}
            >
              Our Services
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {serviceList_servicePage.slice(0, 5).map((ele) => {
                return (
                  <li key={ele.id}>
                    <a href={ele.btnLink} style={{ color: "black", textDecoration: "none" }}>
                      {ele.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Box>
        </Grid>

        {/* Column 3 */}
        <Grid xs={12} sm={6} lg={4}>
          <Box
            className="tp-footer-widget mb-30 wow fadeInUp footer-recent-news"
            data-wow-delay=".9s"
          >
            <Typography
              variant="h4"
              className="tp-footer-widget-title mb-35"
              sx={{ color: "#fc9b04" }}
            >
              Recent News
            </Typography>
            <Box className="tp-footer-news tp-footer-news-three">
              <Box className="tp-footer-news-single tp-footer-news-three-single mb-10">
                <Box className="tp-footer-news-three-single-img">
                  <a href="blog-details.html">
                    <img
                      src={FooterBlog1}
                      className="img-fluid"
                      alt="img-not-found"
                    />
                  </a>
                </Box>
                <Box className="tp-footer-news-three-single-text">
                  <Typography variant="h6" sx={{ color: "black" }}>
                    <a href="blog-details.html" style={{ color: "black", textDecoration: "none" }}>
                      Feugiat pharetra a ductor nonuy vehicula
                    </a>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "black" }}>
                    <span>Jun 02, 2021</span>
                  </Typography>
                </Box>
              </Box>

              <Box className="tp-footer-news-single tp-footer-news-three-single mb-10">
                <Box className="tp-footer-news-three-single-img">
                  <a href="blog-details.html">
                    <img
                      src={FooterBlog2}
                      className="img-fluid"
                      alt="img-not-found"
                    />
                  </a>
                </Box>
                <Box className="tp-footer-news-three-single-text">
                  <Typography variant="h6" sx={{ color: "black" }}>
                    <a href="blog-details.html" style={{ color: "black", textDecoration: "none" }}>
                      Curabitur tortor venenatis an scelerisque
                    </a>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "black" }}>
                    <span>Jun 03, 2021</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>

  {/* Copyright Area */}
  <Box className="tp-copyright-area-two pt-30 pb-30" sx={{ backgroundColor: "#1f2937" }}>
    <Container>
      <Grid container justifyContent="center">
        <Grid size={12}>
          <Box className="tp-copyright text-center">
            <Typography variant="body2" className="m-0" sx={{ color: "black" }}>
              Copyright ©2025 <span style={{ color: "white" }}>UHC Services</span>. All Rights Reserved.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>

  {/* WhatsApp Button */}
  <Box sx={{ position: "absolute", left: 0, bottom: 0 }}>
    <Link
      to="https://wa.me/+17788004455"
      target="_blank"
      style={{
        position: "fixed",
        left: "10px",
        bottom: "-12px",
        color: "#91cc22",
        zIndex: "99999",
        fontSize: "80px",
      }}
    >
      <i className="fab fa-whatsapp"></i>
    </Link>
  </Box>
</footer>

  );
};

export default Footer;
