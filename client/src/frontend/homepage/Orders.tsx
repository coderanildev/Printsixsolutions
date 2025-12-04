import React from "react";
import {
  Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Card, CardContent
} from "@mui/material";
import { useGetMyOrdersQuery } from "../../redux/services/order";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetMyOrdersQuery();

  if (isLoading) return <Typography>Loading...</Typography>;

  const orders = data?.orders || [];
  console.log("order page => order", orders);
  return (
    <Box>
      <Card
        sx={{
          maxWidth: 1135,
          mx: "auto",
          backgroundColor: "#1f2937",
          color: "white",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
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
                  <TableCell sx={{ color: "#fc9b04", fontWeight: "bold" }}>View</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id} sx={{ "&:hover": { backgroundColor: "#2A2A2A" } }}>
                    <TableCell sx={{ color: "white" }}>{order._id}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell
                      sx={{
                        color:
                          order.orderStatus === "DELIVERED"
                            ? "lightgreen"
                            : order.orderStatus === "PENDING"
                            ? "#fc9b04"
                            : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {order.orderStatus}
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>₹{order.totalAmount}</TableCell>
                    <TableCell>
                        <button
                          onClick={() => navigate(`/order/${order._id}`)}
                          style={{
                            padding: "6px 12px",
                            background: "#fc9b04",
                            color: "black",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          View
                        </button>
                      </TableCell>
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
