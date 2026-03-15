import logger from "../../config/logger.js";
import ApiError from "../../utils/ApiError.js";
import { profileRepository } from "./profile.repository.js";

class ProfileService{
  async createProfile( userId, profileData ) {
    const isUserExist = await profileRepository.findProfileByUserId( userId )
    if ( !isUserExist ) {
      throw ApiError.notFound("User not found")
    }
    
    const profile = await profileRepository.createProfile( { ...profileData, userId } )
    logger.info(`Profile created for user: ${userId}`);
    return profile
  }

  async getProfile( userId ) {
    const profile = await profileRepository.findProfileByUserId(userId);
    if ( !profile ) {
      throw ApiError.notFound("Profile not found")
    }
    logger.info(`Profile retrieved for user: ${userId}`);
    return profile
  }

  async updateProfile( userId, profileData ) {
    const profile = await profileRepository.updateProfile( userId, profileData )
    if ( !profile ) {
      throw ApiError.notFound("Profile not found")
    } 
    logger.info(`Profile updated for user: ${userId}`);
    return profile
  }

}

export const profileService = new ProfileService();