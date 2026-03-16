import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { profileService } from "./profile.services.js";

class ProfileController {
  createProfile = asyncHandler(async (req, res) => {
    const profile = await profileService.createProfile(req.user._id, req.body);
    ApiResponse.created(res, profile, "Profile created successfully");
  });

  getPrfile = asyncHandler(async (req, res) => {
    const profile = await profileService.getProfile(req.user._id);
    ApiResponse.success(res, profile, "Profile retrieved successfully");
  });

  updateProfile = asyncHandler(async (req, res) => {
    const profile = await profileService.updateProfile(req.user._id, req.body);
    ApiResponse.success(res, profile, "Profile updated successfully");
  });

  userProfile = asyncHandler(async (req, res) => {
    const profile = await profileService.userProfile(req.user._id);
    ApiResponse.success(res, profile, "Profile updated successfully");
  });
}

export const profileController = new ProfileController();
