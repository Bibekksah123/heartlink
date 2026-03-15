import express from "express";
import { connectionController } from "./connection.controler.js";
import authenticate from "../../middlewares/auth.middleware.js";

const connectionRouter = express.Router();

connectionRouter.use(authenticate)

connectionRouter.get( "/feed", connectionController.getFeed );
connectionRouter.get(
  "/received-requests",
  connectionController.getReceivedConnectionRequest,
);
connectionRouter.get( "/connections", connectionController.getConnections );
connectionRouter.post( "/request/:toUserId/:status", connectionController.connectionRequest );
connectionRouter.put( "/request/:requestId/:status", connectionController.connectionAcceptOrReject );



export default connectionRouter;