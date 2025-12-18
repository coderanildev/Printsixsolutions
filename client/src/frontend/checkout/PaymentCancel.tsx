import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WarningIcon from "@mui/icons-material/Warning";

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const reason = searchParams.get("reason");

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <CancelOutlinedIcon
            sx={{ fontSize: 80, color: "#ff9800", mr: 2 }}
          />
          <Typography variant="h3" sx={{ color: "#ff9800", fontWeight: "bold" }}>
            Payment Cancelled
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "#666", mb: 3 }}
        >
          Your payment was not completed. Please try again or choose a different
          payment method.
        </Typography>
      </Box>

      {/* Alert Box */}
      <Alert severity="warning" sx={{ mb: 4 }}>
        <Typography variant="body2">
          ⚠️ Your payment transaction was cancelled. Your order has not been placed.
          Please review the details below and try again.
        </Typography>
      </Alert>

      {/* Details Card */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            What Happened?
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <WarningIcon sx={{ color: "#ff9800", mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
                  Payment Not Completed
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  You cancelled the PayPal payment process before it was completed.
                  Your order was not placed and no payment was charged.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Transaction Details */}
          <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #eee" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
              Transaction Details
            </Typography>

            {token && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  PayPal Transaction ID
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    wordBreak: "break-all",
                    color: "#666",
                  }}
                >
                  {token}
                </Typography>
              </Box>
            )}

            {reason && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Cancellation Reason
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {reason}
                </Typography>
              </Box>
            )}

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Cancelled At
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {new Date().toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card elevation={3} sx={{ mb: 4, backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            What You Can Do Now?
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>
              <Typography variant="body2">
                Return to checkout and try PayPal payment again
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Choose a different payment method (Cash On Delivery or Credit Card)
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Review your cart items and proceed to checkout
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Contact our support team if you need assistance
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/checkout")}
        >
          Return to Checkout
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>

      {/* FAQ Section */}
      <Card elevation={1} sx={{ backgroundColor: "#f9f9f9" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            FAQ
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Q: Was I charged for this cancelled payment?
            </Typography>
            <Typography variant="body2" color="textSecondary">
              A: No. Since the payment was cancelled, no amount has been charged to
              your account.
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Q: Can I try again with PayPal?
            </Typography>
            <Typography variant="body2" color="textSecondary">
              A: Yes, absolutely! You can go back to checkout and try the payment
              again. Your cart items are saved.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Q: What payment methods are available?
            </Typography>
            <Typography variant="body2" color="textSecondary">
              A: We accept PayPal, Credit Card, and Cash On Delivery (if available
              in your region).
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
