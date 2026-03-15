import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { connectionService } from "./connection.services.js";

class ConnectionController {
  connectionRequest = asyncHandler(async (req, res) => {
    const { status, toUserId } = req.params;
    const fromUserId = req.user._id;
    const connectionRequestSent = await connectionService.connectionRequest(
      fromUserId,
      toUserId,
      status,
    );

    ApiResponse.success(
      res,
      connectionRequestSent,
      "Connection request sent successfully",
    );
  });

  connectionAcceptOrReject = asyncHandler(async (req, res) => {
    const { status, requestId } = req.params;
    const loggedInUser = req.user._id;
    const AcceptOrReject = await connectionService.connectionAcceptOrReject(
      loggedInUser,
      requestId,
      status,
    );

    ApiResponse.success(
      res,
      AcceptOrReject,
      "Connection request reviewed successfully",
    );
  });

  getReceivedConnectionRequest = asyncHandler(async (req, res) => {
    const loggedInUser = req.user._id;
    const receivedConnectionRequest =
      await connectionService.getReceivedConnectionRequest(loggedInUser);
    ApiResponse.success(
      res,
      receivedConnectionRequest,
      "Received connection requests retrieved successfully",
    );
  });

  getConnections = asyncHandler( async ( req, res ) => {
    const loggedInUser = req.user._id;
    const connections = await connectionService.getConnections( loggedInUser );
    ApiResponse.success(res, connections, "Connections retrieved successfully");
  });

  getFeed = asyncHandler( async ( req, res ) => {
    const loggedInUser = req.user._id;
    const page = parseInt( req.query.page ) || 1;
    let limit = parseInt( req.query.limit ) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = ( page - 1 ) * limit;
    const feed = await connectionService.getFeed( loggedInUser, skip, limit );
      ApiResponse.success(
      res,
      feed,
      "Feed retrieved successfully",
    );
  });
}

export const connectionController = new ConnectionController();
