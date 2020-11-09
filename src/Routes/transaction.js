const transactionRouter = require("express").Router();
const transactionController = require("../Controllers/transaction");

transactionRouter.post("/transfer", transactionController.transaction);
transactionRouter.post("/topup", transactionController.topUp);
transactionRouter.get("/history/:id", transactionController.history);

module.exports = transactionRouter;
