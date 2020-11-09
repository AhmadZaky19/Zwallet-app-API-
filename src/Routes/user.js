const userRouter = require("express").Router();
const userController = require("../Controllers/user");
const uploadImg = require("../Helpers/Middlewares/uploadImg");

userRouter.patch("/edit/:id", uploadImg.singleUpload, userController.editUser);
userRouter.get("/alluser/:id", userController.selectAllUser);
userRouter.post("/search", userController.searchUser);
userRouter.get("/balance/:id", userController.fetchBalance);

module.exports = userRouter;
