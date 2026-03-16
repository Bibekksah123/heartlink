import chatModel from "./chat.model.js";

class ChatRepository {

  async findChatBetweenUsers( userId1, userId2 ) {
    let chat = await chatModel
      .findOne( {
        participate: { $all: [ userId1, userId2 ] },
      } )
      .populate( {
        path: "message.senderId",
        select: "name",
      } );
    if ( !chat ) {
      chat = new chatModel( {
        participate: [ userId1, userId2 ],
        message: [],
      } );
      await chat.save();
    }
    return chat;
  }

}


export const chatRepository = new ChatRepository();