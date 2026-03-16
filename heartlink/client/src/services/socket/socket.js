import { api } from "../Api/AxiosInstance";

export const ChatConnection = {
  getChat: async ( toUserId ) => {
    const response = await api.get(`/chat/user/${toUserId}`);
    return response.data;
  }
}