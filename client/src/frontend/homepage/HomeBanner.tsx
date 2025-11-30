import React from "react";
import Slider from "react-slick";
import { Button, Typography, Container, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useGetAllSlidersQuery } from "../../redux/services/slider";

// Custom Arrows
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Box className="custom-arrow left" onClick={onClick}>
      <ChevronLeftIcon fontSize="large" />
    </Box>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Box className="custom-arrow right" onClick={onClick}>
      <ChevronRightIcon fontSize="large" />
    </Box>
  );
};

// Slider Settings
const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const HomeBanner: React.FC = () => {
  // Fetch backend data
  const { data: slidersData, isLoading, isError } = useGetAllSlidersQuery();

  if (isLoading) return <p>Loading banners...</p>;
  if (isError) return <p>Failed to load banners...</p>;

  // Extract array of sliders
  const sliders = slidersData?.sliders || [];

  // Use only active sliders
  const activeSliders = sliders.filter((s: any) => s.isActive);

  return (
    <Slider {...sliderSettings}>
      {activeSliders.map((banner: any) => (
        <Box
          key={banner._id}
          sx={{
            backgroundImage: `url(${banner.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "400px", md: "600px" },
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Container className="text-white">
            {/* SHOW TITLE WITH <br /> SUPPORT */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "medium",
                marginTop: 18,
                color: "white",
                fontSize: { xs: "1.75rem", md: "3rem", lg: "4rem" },
              }}
              dangerouslySetInnerHTML={{ __html: banner.shortDescription || banner.title }}
            />

            {/* DESCRIPTION */}
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                marginBottom: 4,
                maxWidth: "600px",
              }}
            >
              {banner.description}
            </Typography>

            {/* BUTTON */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 2,
                paddingX: 4,
                paddingY: 1.5,
                fontWeight: "medium",
                textTransform: "none",
              }}
              href="/shop"
            >
              Shop Now
            </Button>
          </Container>
        </Box>
      ))}
    </Slider>
  );
};

export default HomeBanner;
