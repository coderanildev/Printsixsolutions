import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Contact = () => {
  return (
    <Box sx={{ backgroundColor: "#020817", minHeight: "100vh", py: 8 }}>
      <Container maxWidth={false} sx={{ maxWidth: "1370px", mx: "auto" }}>
        <Typography
          variant="h3"
          sx={{
            color: "#fc9b04",
            textAlign: "center",
            fontWeight: "bold",
            mb: 6,
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4} alignItems="center">
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: "#1f2937",
                color: "white",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                p: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: "#fc9b04", mb: 3, fontWeight: "600" }}
                >
                  Get in Touch
                </Typography>
                <Typography variant="body2" sx={{ mb: 3,color:"white" }}>
                  Have questions or feedback? We’d love to hear from you. Fill out the form below, and our team will get back to you shortly.
                </Typography>

                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{
                    "& .MuiInputBase-root": {
                
                    },
                    "& .MuiOutlinedInput-input": {
                
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.8rem",
                      top: "-4px",
                      color: "#fc9b04",
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <TextField label="Name" fullWidth variant="outlined" />
                  <TextField label="Email" type="email" fullWidth variant="outlined" />
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#fc9b04",
                      color: "black",
                      fontWeight: "bold",
                      mt: 2,
                      "&:hover": {
                        backgroundColor: "#e68a00",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
              alt="Paper packaging"
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
