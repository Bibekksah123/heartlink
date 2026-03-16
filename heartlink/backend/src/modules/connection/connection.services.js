import ApiError from "../../utils/ApiError.js";
import { connectionRepository } from "./connection.repository.js";

class ConnectionService {
  async connectionRequest(fromUserId, toUserId, status) {
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      ApiError.badRequest("Invalid status: " + status);
    }
    const userExits = await connectionRepository.findById(toUserId);
    if (!userExits) {
      ApiError.notFound("Interested user not found");
    }

    const userAlreadyExists = await connectionRepository.findConnectionRequest(
      fromUserId,
      toUserId,
    );
    if (userAlreadyExists) {
      ApiError.badRequest("Connection request already exists");
    }

    const connectionRequestData = {
      fromUserId,
      toUserId,
      status,
    };
    const connectionRequestSent =
      await connectionRepository.createConnectionRequest(connectionRequestData);
    return connectionRequestSent;
  }

  async connectionAcceptOrReject(loggedInUser, requestId, status) {
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      ApiError.badRequest("Invalid status: " + status);
    }
    const connectionRequest =
      await connectionRepository.findConnectionRequestById(
        requestId,
        loggedInUser,
      );
    if (!connectionRequest) {
      ApiError.notFound("Connection request not found");
    }
    if (!connectionRequest?.toUserId.equals(loggedInUser)) {
      ApiError.unauthorized(
        "You are not authorized to review this connection request",
      );
    }
    connectionRequest.status = status;
    await connectionRequest.save();
    return connectionRequest;
  }

  async getReceivedConnectionRequest( loggedInUser ) {
    const receivedConnectionRequests = await connectionRepository.findReceivedConnectionRequests( loggedInUser );
    return receivedConnectionRequests;
  }

  async getConnections( loggedInUser ) {
    const connections = await connectionRepository.findConnections( loggedInUser );
    return connections;
  }

  async getFeed( loggedInUser, skip, limit ) {
    const feed = await connectionRepository.getFeed( loggedInUser, skip, limit );
    return feed;
  }

  
}

export const connectionService = new ConnectionService();
