import { api } from "./AxiosInstance";

export const User = {
  createUser: async (payload) => {
    const { data } = await api.post("/auth/user/register", payload);
    return data;
  },

  loginUser: async (payload) => {
    const { data } = await api.post("/auth/user/login", payload);
    return data;
  },

  logoutUser: async () => {
    const res = await api.post("/auth/user/logout");
    return res;
  },

  changePassword: async (payload) => {
    const res = await api.post("/auth/user/change-password",payload);
    return res;
  }
};

export const ConnectionRequest = {
  getAllFeeds: async () => {
    const { data } = await api.get("/connection/feed");
    return data;
  },
  connectionRecieve: async () => {
    const { data } = await api.get("/connection/received-requests");
    return data;
  },
  sentConnectionRequest: async ( { requestId, status } ) => {
    const { data } = await api.post(
      `/connection/request/${requestId}/${status}`,
    );
    return data;
  },
  AcceptOrRejectConnection: async (Id, status) => {
    const { data } = await api.post(`/connection/request/${Id}/${status}`);
    return data;
  },
};

 export const Chat = {
  getAllChat: async () => {
    const { data } = await api.get("/chat/user/:toUserId");
    return data;
  },
};

export const Profile = {
  getUserProfile: async () => {
    const { data } = await api.get("/user/profile/get");
    return data;
  },

  createUserProfile: async (payload) => {
    const { data } = await api.post("/user/profile/create", payload);
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await api.put("/user/profile/update", payload);
    return data;
  },
};
