import express from "express";
import { userController } from "./user.controler.js";
import authenticate from "../../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post( "/register", userController.register )
userRouter.post( "/login", userController.login )

userRouter.use(authenticate)
userRouter.post( "/logout", userController.logout )
userRouter.post( "/change-password", userController.changePassword )

export default userRouter;