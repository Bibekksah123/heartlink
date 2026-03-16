import logger from "../../config/logger.js";
import User from "../user/user.model.js";
import ConnectionRequestModel from "./connection.model.js";

class ConnectionRepository {
  async findById(id) {
    return User.findById(id);
  }

  async findConnectionRequest(fromUserId, toUserId) {
    return await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
  }

  async createConnectionRequest(connectionRequestData) {
    const connectionRequest = await ConnectionRequestModel.create(
      connectionRequestData,
    );
    logger.info(
      `Connection request created from user ${connectionRequestData.fromUserId} to user ${connectionRequestData.toUserId} with status ${connectionRequestData.status}`,
    );
    return connectionRequest;
  }

  async findConnectionRequestById(requestId, loggedInUser) {
    return await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
  }

  async findReceivedConnectionRequests(loggedInUser) {
    return await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate({
      path: "fromUserId",
      select: "name",
      populate: {
        path: "profileId",
        select: "profilePic  bio",
      },
    });
  }

  async findConnections(loggedInUser) {
    const connections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate([
      {
        path: "fromUserId",
        select: "name",
        populate: { path: "profileId", select: "profilePic" },
      },
      {
        path: "toUserId",
        select: "name",
        populate: { path: "profileId", select: "profilePic" },
      },
    ]);
    return connections;
  }

  async getFeed(loggedInUser, skip, limit) {
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        {
          toUserId: loggedInUser,
        },
        {
          fromUserId: loggedInUser,
        },
      ],
    }).select("fromUserId toUserId");

    const hiddenUserConnection = new Set();
    connectionRequest.map((feed) => {
      hiddenUserConnection.add(feed.fromUserId.toString());
      hiddenUserConnection.add(feed.toUserId.toString());
    });

    const feedUser = await User.find(
      {
        $and: [
          { _id: { $nin: Array.from(hiddenUserConnection) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      },
      "name profileId",
    )
      .populate("profileId", "profilePic age")
      .skip(skip)
      .limit(limit);

    return feedUser;
  }
}

export const connectionRepository = new ConnectionRepository();
