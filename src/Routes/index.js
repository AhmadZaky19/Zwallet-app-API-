const express = require("express");

const authRouter = require("./auth");
const userRouter = require("./user");
const transactionRouter = require("./transaction");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/user", userRouter);
indexRouter.use("/transaction", transactionRouter);

module.exports = indexRouter;
