import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    algorithmQuestionAndAnswer: [
      {
        questionId: {
          type: String,
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    skills: [String],
    experience: [String],
    education: [String],
    interest: [String],
    location: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: null,
    },
  },

  { timestamps: true },
);

const ProfileModel = mongoose.model("Profile", profileSchema);

export default ProfileModel;
