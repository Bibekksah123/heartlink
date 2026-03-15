import ApiError from "../../utils/ApiError.js";
import { chatRepository } from "./chat.repository.js";

class ChatService {
  async getChat( userId, toUserId ) {
    const chat = await chatRepository.findChatBetweenUsers( userId, toUserId )
    if ( !chat ) {
      throw ApiError.notFound("Chat not found")
    }
    return chat;
  }
}

export const chatService = new ChatService();