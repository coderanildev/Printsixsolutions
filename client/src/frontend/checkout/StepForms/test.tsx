import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, New Delhi, India",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  const orders = [
    { id: "ORD12345", date: "2025-10-20", status: "Delivered", total: "₹2,499" },
    { id: "ORD12346", date: "2025-10-15", status: "Pending", total: "₹1,299" },
    { id: "ORD12347", date: "2025-10-10", status: "Cancelled", total: "₹899" },
  ];

  // ✅ Common styling for TextFields
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      color: "black",
      height: 43,
      "& fieldset": { borderColor: "#444" },
      "&:hover fieldset": { borderColor: "#fc9b04" },
      "& input": { color: "black" }, // black text
    },
    "& .MuiInputLabel-root": {
      color: "#fc9b04",
      fontSize: "0.9rem",
      top: "-4px",
    },
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#020817",
        minHeight: "100vh",
        color: "white",
        py: 5,
        px: 3,
      }}
    >
      {/* --- Profile Card --- */}
      <Card
        sx={{
          maxWidth: 1135,
          mx: "auto",
          backgroundColor: "#1f2937",
          color: "white",
          borderRadius: 3,
          boxShadow: 5,
          mb: 5,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <Avatar
              src={user.avatar}
              sx={{ width: 90, height: 90, border: "2px solid #fc9b04" }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color:"white" }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "gray" }}>
                {user.email}
              </Typography>
              <Typography variant="body2" sx={{ color: "#fc9b04" }}>
                Customer Account
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, backgroundColor: "#333" }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={user.address}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fc9b04",
                color: "black",
                fontWeight: "bold",
                px: 4,
                "&:hover": { backgroundColor: "#ffb733" },
              }}
              onClick={() => alert("Profile updated successfully!")}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* --- Order List --- */}
      <Card
        sx={{
          maxWidth:1135,
          mx: "auto",
          backgroundColor: "#1f2937",
          color: "white",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color:"white" }}>
            My Orders
          </Typography>

          <TableContainer component={Paper} sx={{ backgroundColor: "#1f2937" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fc9b04", fontWeight: "bold" }}>Order ID</TableCell>
                  <TableCell sx={{ color: "#fc9b04", fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ color: "#fc9b04", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "#fc9b04", fontWeight: "bold" }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ "&:hover": { backgroundColor: "#2A2A2A" } }}
                  >
                    <TableCell sx={{ color: "white" }}>{order.id}</TableCell>
                    <TableCell sx={{ color: "white" }}>{order.date}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          order.status === "Delivered"
                            ? "lightgreen"
                            : order.status === "Pending"
                            ? "#fc9b04"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
