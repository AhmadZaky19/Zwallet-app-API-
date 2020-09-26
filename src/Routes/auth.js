const authRouter = require("express").Router();
const authController = require("../Controllers/auth");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/inputPin/:id", authController.createPin);

module.exports = authRouter;
