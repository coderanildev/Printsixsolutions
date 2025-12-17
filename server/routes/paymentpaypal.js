const express = require("express");
const router = express.Router();
const axios = require("axios");

const Order = require("../model/Order");

// ------------------------------------
// 🔐 PayPal Access Token
// ------------------------------------
async function getPayPalAccessToken() {
  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
    method: "post",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
    params: {
      grant_type: "client_credentials",
    },
  });

  return response.data.access_token;
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

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
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
          return_url: "http://localhost:5173/paypal-success",
          cancel_url: "http://localhost:5173/paypal-cancel",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Save PayPal Order ID in DB
    await Order.findByIdAndUpdate(orderId, {
      paymentMethod: "PayPal",
      paymentStatus: "PENDING",
      "paypal.orderId": response.data.id,
    });

    const approvalUrl = response.data.links.find(
      (link) => link.rel === "approve"
    ).href;

    return res.status(200).json({
      success: true,
      approvalUrl,
    });
  } catch (error) {
    console.error("PAYPAL CREATE ERROR:", error.response?.data || error.message);
    return res.status(500).json({
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

    if (!token) {
      return res.redirect("http://localhost:5173/paypal-cancel");
    }

    const accessToken = await getPayPalAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${token}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const order = await Order.findOne({ "paypal.orderId": token });

    if (!order) {
      return res.redirect("http://localhost:5173/paypal-cancel");
    }

    order.paymentStatus = "PAID";
    order.orderStatus = "PLACED";
    order.paypal.paymentId = response.data.id;

    await order.save();

    return res.redirect("http://localhost:5173/customer/orders");
  } catch (error) {
    console.error("PAYPAL CAPTURE ERROR:", error.response?.data || error.message);
    return res.redirect("http://localhost:5173/paypal-cancel");
  }
});

module.exports = router;
