import User from "../user/user.model.js";
import ProfileModel from "./profile.model.js";

class ProfileRepository{
  async findProfileByUserId( userId ) {
    return await User.findById( userId ).select( "-password -email -__v" ).lean();
  }

  async createProfile( profileData ) {
    const profile = await ProfileModel.create( profileData )
    await User.findByIdAndUpdate(profile.userId, {
      profileId: profile._id,
      isVerified: true,
    });
    return profile
  }

  async findProfileById( profileId ) {
    const profile = await ProfileModel.findOne({ userId: profileId })
      .select("-algorithmQuestionAndAnswer")
      .lean();
    return profile;
  }

  async updateProfile( userId, profileData ) {
    const profile = await ProfileModel.findOneAndUpdate(
      { userId },
      { $set: profileData },
      { new: true }
    ).select("-algorithmQuestionAndAnswer").lean();
    return profile;
  }
}

export const profileRepository = new ProfileRepository();