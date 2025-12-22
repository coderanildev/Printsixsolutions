import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useGetOrderDetailsQuery } from "../../redux/services/order";

const cardStyle = {
  backgroundColor: "#0f172a", // blue
  color: "white",
  borderRadius: 3,
};

const headingStyle = {
  color: "#fb923c", // orange
  fontWeight: "bold",
};

const CustomerOrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrderDetailsQuery(id);

  if (isLoading)
    return (
      <Container sx={{ py: 6 }}>
        <Typography align="center">Loading order details...</Typography>
      </Container>
    );

  if (isError || !data?.order)
    return (
      <Container sx={{ py: 6 }}>
        <Typography align="center" color="error">
          Failed to load order details
        </Typography>
      </Container>
    );

  const order = data.order;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* ================= ORDER ITEMS ================= */}
      <Card sx={{ ...cardStyle, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ ...headingStyle, mb: 2 }}>
            Order Items
          </Typography>

          <TableContainer component={Paper} sx={{ background: "transparent" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fb923c" }}>Product</TableCell>
                  <TableCell sx={{ color: "#fb923c" }} align="center">
                    Qty
                  </TableCell>
                  <TableCell sx={{ color: "#fb923c" }} align="right">
                    Price
                  </TableCell>
                  <TableCell sx={{ color: "#fb923c" }} align="right">
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ color: "white" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          width={60}
                          style={{ borderRadius: 6 }}
                        />
                        {item.name}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      ₹{item.price}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      ₹{item.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ================= ORDER + CUSTOMER INFO ================= */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Order Info */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ ...headingStyle, mb: 2 }}>
                Order Information
              </Typography>

              <Typography>Order ID: {order._id}</Typography>
              <Typography>Order Status: {order.orderStatus}</Typography>
              <Typography>Payment Status: {order.paymentStatus}</Typography>
              <Typography>Payment Method: {order.paymentMethod}</Typography>
              <Typography>Total Amount: ₹{order.totalAmount}</Typography>
              <Typography>
                Order Date: {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Info */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ ...headingStyle, mb: 2 }}>
                Customer Information
              </Typography>

              <Typography>Name: {order.userId?.name}</Typography>
              <Typography>Email: {order.userId?.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= SHIPPING + BILLING ================= */}
      <Grid container spacing={3}>
        {/* Shipping */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={headingStyle}>
                Shipping Address
              </Typography>

              <Typography>{order.shippingAddress?.fullName}</Typography>
              <Typography>{order.shippingAddress?.address1}</Typography>
              <Typography>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </Typography>
              <Typography>{order.shippingAddress?.country}</Typography>
              <Typography>Phone: {order.shippingAddress?.phone}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Billing */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={headingStyle}>
                Billing Address
              </Typography>

              <Typography>
                {order.billingAddress?.fullName ||
                  order.shippingAddress?.fullName}
              </Typography>
              <Typography>
                {order.billingAddress?.address1 ||
                  order.shippingAddress?.address1}
              </Typography>
              <Typography>
                {order.billingAddress?.city ||
                  order.shippingAddress?.city},{" "}
                {order.billingAddress?.state ||
                  order.shippingAddress?.state}{" "}
                {order.billingAddress?.postalCode ||
                  order.shippingAddress?.postalCode}
              </Typography>
              <Typography>
                {order.billingAddress?.country ||
                  order.shippingAddress?.country}
              </Typography>
              <Typography>
                Phone:{" "}
                {order.billingAddress?.phone ||
                  order.shippingAddress?.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerOrderDetails;
