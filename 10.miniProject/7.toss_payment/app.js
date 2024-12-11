require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;
const apiSecretKey = process.env.TOSS_SECRET_KEY;
const encodeApiSecretKey =
  "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// 라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product.html"));
});

app.post("/confirm/payment", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;

  try {
    const response = await axios.post(
      `https://api.tosspayments.com/v1/payments/confirm`,
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: encodeApiSecretKey,
          "Content-Type": "application/json",
        },
      }
    );
    // 최종 결제 성공
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: true, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
