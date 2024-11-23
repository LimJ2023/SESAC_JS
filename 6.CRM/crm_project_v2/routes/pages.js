const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
});
router.get(["/users", "/users/:page"], (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
});
router.get("/user/:id", (req, res) => {
  res.sendFile(path.resolve("public/user_detail.html"));
});
router.get(["/stores/", "/stores/:page"], (req, res) => {
  res.sendFile(path.resolve("public/store.html"));
});
router.get("/store/:id", (req, res) => {
  res.sendFile(path.resolve("public/store_detail.html"));
});
router.get(["/items/", "/items/:page"], (req, res) => {
  res.sendFile(path.resolve("public/item.html"));
});
router.get("/item/:id", (req, res) => {
  res.sendFile(path.resolve("public/item_detail.html"));
});
router.get(["/orders/", "/orders/:page"], (req, res) => {
  res.sendFile(path.resolve("public/order.html"));
});
router.get("/order/:id", (req, res) => {
  res.sendFile(path.resolve("public/order_detail.html"));
});
router.get(["/orderItem/", "/orderItem/:page"], (req, res) => {
  res.sendFile(path.resolve("public/orderItem.html"));
});
module.exports = router;
