import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { chatService } from "./chat.services.js";

export const getChat = asyncHandler( async ( req, res ) => {
  const result = await chatService.getChat( req.user._id, req.params.toUserId );
  ApiResponse.success( res, result, "Chat retrieved successfully" );

} );
