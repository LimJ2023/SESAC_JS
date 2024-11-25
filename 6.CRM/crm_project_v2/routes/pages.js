const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.sendFile(path.resolve("public/users.html"));
  } catch (error) {
    console.error("페이지 호출 에러 : GET /:", error.message);
    res.status(500).send("페이지를 불러오는 중 오류 발생 : the users page");
  }
});

router.get(["/users", "/users/:page"], (req, res) => {
  try {
    res.sendFile(path.resolve("public/users.html"));
  } catch (error) {
    console.error(
      "페이지 호출 에러 : GET /users or /users/:page:",
      error.message
    );
    res.status(500).send("페이지를 불러오는 중 오류 발생 : the users page");
  }
});

router.get("/user/:id", (req, res) => {
  try {
    res.sendFile(path.resolve("public/user_detail.html"));
  } catch (error) {
    console.error("페이지 호출 에러 : GET /user/:id:", error.message);
    res
      .status(500)
      .send("페이지를 불러오는 중 오류 발생 :  the user detail page.");
  }
});

router.get(["/stores/", "/stores/:page"], (req, res) => {
  try {
    res.sendFile(path.resolve("public/store.html"));
  } catch (error) {
    console.error(
      "페이지 호출 에러 : GET /stores/ or /stores/:page:",
      error.message
    );
    res.status(500).send("페이지를 불러오는 중 오류 발생 :  the store page.");
  }
});

router.get("/store/:id", (req, res) => {
  try {
    res.sendFile(path.resolve("public/store_detail.html"));
  } catch (error) {
    console.error("페이지 호출 에러 : GET /store/:id:", error.message);
    res
      .status(500)
      .send("페이지를 불러오는 중 오류 발생 :  the store detail page.");
  }
});

router.get(["/items/", "/items/:page"], (req, res) => {
  try {
    res.sendFile(path.resolve("public/item.html"));
  } catch (error) {
    console.error(
      "페이지 호출 에러 : GET /items/ or /items/:page:",
      error.message
    );
    res.status(500).send("페이지를 불러오는 중 오류 발생 :  the item page.");
  }
});

router.get("/item/:id", (req, res) => {
  try {
    res.sendFile(path.resolve("public/item_detail.html"));
  } catch (error) {
    console.error("페이지 호출 에러 : GET /item/:id:", error.message);
    res
      .status(500)
      .send("페이지를 불러오는 중 오류 발생 :  the item detail page.");
  }
});

router.get(["/orders/", "/orders/:page"], (req, res) => {
  try {
    res.sendFile(path.resolve("public/order.html"));
  } catch (error) {
    console.error(
      "페이지 호출 에러 : GET /orders/ or /orders/:page:",
      error.message
    );
    res.status(500).send("페이지를 불러오는 중 오류 발생 :  the orders page.");
  }
});

router.get("/order/:id", (req, res) => {
  try {
    res.sendFile(path.resolve("public/order_detail.html"));
  } catch (error) {
    console.error("페이지 호출 에러 : GET /order/:id:", error.message);
    res
      .status(500)
      .send("페이지를 불러오는 중 오류 발생 :  the order detail page.");
  }
});

router.get(["/orderItem/", "/orderItem/:page"], (req, res) => {
  try {
    res.sendFile(path.resolve("public/orderItem.html"));
  } catch (error) {
    console.error(
      "페이지 호출 에러 : GET /orderItem/ or /orderItem/:page:",
      error.message
    );
    res
      .status(500)
      .send("페이지를 불러오는 중 오류 발생 :  the order items page.");
  }
});

module.exports = router;
