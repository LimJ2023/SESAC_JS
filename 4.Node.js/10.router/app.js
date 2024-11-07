const express = require("express");
const app = express();
const port = 3000;

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
// 이제 /user로 요청이 오면 userRouter를 호출하겠지.
// 그 안에서 /profile을 하면 정보가 나옴. 즉 /user/profile이 가능.

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("웰컴");
});

app.listen(port, () => {
  console.log("서버 레디");
});
