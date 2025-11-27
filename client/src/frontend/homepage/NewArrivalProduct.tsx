import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import { useGetAllProductNewArrivalQuery } from "../../redux/services/products";
import AddToCartButton from "../cart/AddToCartButton";
import StarIcon from "@mui/icons-material/Star";
import { Box, Card, CardContent, CardMedia } from "@mui/material";

const NewArrivalProduct: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProductNewArrivalQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  const products = (data?.products || []).slice(0, 8);

  return (
    <div   style={{ backgroundColor: "#020817", padding: "50px 0" }}>
      <Container maxWidth={false}   style={{ maxWidth:"1395px"}}>
        <Typography
          variant="h5"
          color="#fc9b04"
          className="text-uppercase mb-4"
          gutterBottom
        >
          New Arrivals
        </Typography>

        <Grid container spacing={3}>
          {products.map((product: any) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card
                className="shadow-sm rounded overflow-hidden"
                sx={{ height: 400, backgroundColor: "#fff" }}
              >
                <a
                  href={`/products/${product.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    height="155"
                    image={product.imageUrl}
                    alt={product.title}
                    className="object-cover"
                    sx={{ mt: 1 }}
                  />
                </a>

                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    className="mb-2"
                    sx={{ fontWeight: 600 }}
                  >
                    <a
                      href={`/products/${product.slug}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {product.title}
                    </a>
                  </Typography>

                  {product.categoryId && (
                    <Typography variant="body2" color="textSecondary">
                      Category:{" "}
                      <a
                        href={`/category/${product.categoryId.slug}`}
                        style={{ color: "#1976d2" }}
                      >
                        {product.categoryId.title}
                      </a>
                    </Typography>
                  )}

                  <Box className="d-flex align-items-baseline mt-2 mb-2">
                    <Typography
                      variant="h6"
                      color="primary"
                      className="me-2"
                      sx={{ color: "#fc9b04" }}
                    >
                      ₹{product.salePrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{product.productPrice}
                    </Typography>
                  </Box>

                  <Box className="mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        fontSize="small"
                        color={
                          index < (product.reviews || 0)
                            ? "warning"
                            : "disabled"
                        }
                      />
                    ))}
                  </Box>

                  <Box className="d-flex justify-content-between align-items-center">
                    <AddToCartButton product={product} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default NewArrivalProduct;
