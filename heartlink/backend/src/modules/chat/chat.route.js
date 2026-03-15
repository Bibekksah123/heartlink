import express from "express"
import authenticate from "../../middlewares/auth.middleware.js";
import { getChat } from "./chat.controler.js";

const chatRouter = express.Router();

chatRouter.get("/user/:toUserId",authenticate , getChat);

export default chatRouter;