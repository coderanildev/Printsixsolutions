import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,Card,CardContent
} from "@mui/material";

const UserProfile = () => {
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

  

  return (
    <Box>
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

export default UserProfile;
