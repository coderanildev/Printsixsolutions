const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

// ------------------------------------
// 🔐 GET PAYPAL ACCESS TOKEN (FETCH)
// ------------------------------------
async function getPayPalAccessToken() {
  const response = await fetch(
    `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: "grant_type=client_credentials",
    }
  );

  const data = await response.json();
  return data.access_token;
}

// ------------------------------------
// 📌 CREATE PAYPAL PAYMENT
// ------------------------------------
router.post("/paypal/create", async (req, res) => {
  try {
    const { orderId, totalAmount } = req.body;

    if (!orderId || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "orderId and totalAmount are required",
      });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          ],
          application_context: {
            return_url: "http://localhost:3000/payments/paypal/capture",
            cancel_url: "http://localhost:5173/paypal-cancel",
          },
        }),
      }
    );

    const data = await response.json();
    console.log("PAYPAL CREATE RESPONSE:", data);
    // Save PayPal order ID in DB
    await Order.findByIdAndUpdate(orderId, {
      paymentMethod: "PayPal",
      paymentStatus: "PENDING",
      "paypal.orderId": data.id,
    });

    const approvalUrl = data.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(200).json({
      success: true,
      approvalUrl,
    });
  } catch (error) {
    console.error("PAYPAL CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "PayPal payment creation failed",
    });
  }
});

// ------------------------------------
// 📌 CAPTURE PAYPAL PAYMENT
// ------------------------------------
router.get("/paypal/capture", async (req, res) => {
  try {
    const { token } = req.query;

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${token}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    const order = await Order.findOne({ "paypal.orderId": token });

    if (!order) {
      return res.redirect("http://localhost:5173/paypal-cancel");
    }

    order.paymentStatus = "PAID";
    order.orderStatus = "PLACED";
    order.paypal.paymentId = data.id;

    await order.save();

    return res.redirect("http://localhost:5173/customer/orders");
  } catch (error) {
    console.error("PAYPAL CAPTURE ERROR:", error);
    return res.redirect("http://localhost:5173/paypal-cancel");
  }
});

module.exports = router;
