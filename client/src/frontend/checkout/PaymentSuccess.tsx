import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useGetOrderDetailsQuery } from "../../redux/services/order";
import { clearCart } from "../../redux/reducer/cart";

export default function PaymentSuccess() {
 const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId");
  const token = searchParams.get("token");

  const { data: orderData, isLoading, error } = useGetOrderDetailsQuery(
    orderId,
    { skip: !orderId }
  );

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const order = orderData?.order;

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">Loading order details...</Typography>
        </Box>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Unable to load order details
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "#4caf50", mr: 2 }}
          />
          <Typography variant="h3" sx={{ color: "#4caf50", fontWeight: "bold" }}>
            Payment Successful!
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ textAlign: "center", color: "#666", mb: 3 }}>
          Thank you for your purchase. Your order has been placed successfully.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Order Summary Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Order Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Order ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {order._id}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Payment Method
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {order.paymentMethod}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Payment Status
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#4caf50",
                  }}
                >
                  {order.paymentStatus}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Order Status
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {order.orderStatus}
                </Typography>
              </Box>

              {token && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    PayPal Transaction ID
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      wordBreak: "break-all",
                    }}
                  >
                    {token}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Pricing Summary Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Price Summary
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">${order.subTotal.toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body2">Shipping Cost</Typography>
                  <Typography variant="body2">
                    ${order.shippingCost.toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Total Amount Paid
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#4caf50" }}
                  >
                    ${order.totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Items Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Order Items
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Quantity
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Unit Price
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Addresses */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Shipping Address
              </Typography>
              <Typography variant="body2">
                {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
              </Typography>
              <Typography variant="body2">
                {order.shippingAddress?.addressLine1}
              </Typography>
              {order.shippingAddress?.addressLine2 && (
                <Typography variant="body2">
                  {order.shippingAddress?.addressLine2}
                </Typography>
              )}
              <Typography variant="body2">
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </Typography>
              <Typography variant="body2">
                {order.shippingAddress?.country}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Phone: {order.shippingAddress?.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Billing Address
              </Typography>
              <Typography variant="body2">
                {order.billingAddress?.firstName} {order.billingAddress?.lastName}
              </Typography>
              <Typography variant="body2">
                {order.billingAddress?.addressLine1}
              </Typography>
              {order.billingAddress?.addressLine2 && (
                <Typography variant="body2">
                  {order.billingAddress?.addressLine2}
                </Typography>
              )}
              <Typography variant="body2">
                {order.billingAddress?.city}, {order.billingAddress?.state}{" "}
                {order.billingAddress?.postalCode}
              </Typography>
              <Typography variant="body2">
                {order.billingAddress?.country}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Phone: {order.billingAddress?.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mt: 6,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/customer/orders")}
        >
          View All Orders
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}
