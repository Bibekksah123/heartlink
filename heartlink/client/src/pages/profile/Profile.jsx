import React, { useState } from "react";
import "./Profile.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Profile } from "../../services/Api/user";
import toast from "react-hot-toast";

function ProfileInfo() {
  const { data: profiledata } = useQuery({
    queryKey: ["user/profile"],
    queryFn: Profile.userProfile,
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to load profile");
    },
  });

  const INITIAL_PROFILE = {
    profilePic: profiledata?.data.profilePic,
    bio: profiledata?.data.bio,
    skills: profiledata?.data.skills,
    experience: profiledata?.data.experience,
    education: profiledata?.data.education,
    interest: profiledata?.data.interest,
    location: profiledata?.data.location,
    age: profiledata?.data.age,
  };

  setTimeout( () => {
    
  },2000)

  const [ profile, setProfile ] = useState( INITIAL_PROFILE );
  
  

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleArrayChange = (field) => (e) => {
    const vals = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setProfile((prev) => ({ ...prev, [field]: vals }));
  };

  const { mutate: ProfileUpdationMutation } = useMutation({
    mutationFn: Profile.updateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "profile updation  failed");
    },
  });

  const handleSave = () => {
    ProfileUpdationMutation(profile);
  };

  return (
    <div className="profile-pg">
      <div className="pg-header">
        <div>
          <h1 className="pg-title">My Profile</h1>
          <p className="pg-subtitle">Edit how others see you</p>
        </div>
      </div>
      <div className="prof-grid">
        <div>
          <div className="prof-card">
            <div className="prof-card-bg" />
            <div className="prof-card-av">
              <img src={profile?.profilePic} alt="profile" />
            </div>
            <div className="prof-card-body">
              <div className="prof-card-name">
                {/* you could insert name here */}
              </div>
              <div className="prof-card-meta">
                {profile?.age} · {profile?.location}
              </div>
              <div className="prof-card-bio">{profile.bio}</div>
              <div className="prof-card-tags">
                {profile?.skills?.map((s, i) => (
                  <span key={i} className="tag-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-section">
            <div className="es-title">
              <span>👤</span>Basic Info
            </div>
            <div className="es-grid">
              <div>
                <label className="label-txt">Profile Picture URL</label>
                <input
                  className="input-field"
                  value={profile?.profilePic}
                  onChange={handleChange("profilePic")}
                />
              </div>
              <div>
                <label className="label-txt">Age</label>
                <input
                  className="input-field"
                  type="number"
                  value={profile?.age}
                  onChange={handleChange("age")}
                />
              </div>
              <div>
                <label className="label-txt">Location</label>
                <input
                  className="input-field"
                  value={profile?.location}
                  onChange={handleChange("location")}
                />
              </div>
              <div className="es-full">
                <label className="label-txt">Bio</label>
                <textarea
                  className="input-field"
                  rows="3"
                  style={{ resize: "none" }}
                  value={profile?.bio}
                  onChange={handleChange("bio")}
                />
              </div>
            </div>
          </div>
          <div className="edit-section">
            <div className="es-title">
              <span>🛠️</span>Skills / Experience / Education / Interests
            </div>
            <div className="es-grid">
              <div className="es-full">
                <label className="label-txt">Skills (comma separated)</label>
                <input
                  className="input-field"
                  value={profile?.skills?.join(", ")}
                  onChange={handleArrayChange("skills")}
                />
              </div>
              <div className="es-full">
                <label className="label-txt">
                  Experience (comma separated)
                </label>
                <input
                  className="input-field"
                  value={profile?.experience?.join(", ")}
                  onChange={handleArrayChange("experience")}
                />
              </div>
              <div className="es-full">
                <label className="label-txt">Education (comma separated)</label>
                <input
                  className="input-field"
                  value={profile?.education?.join(", ")}
                  onChange={handleArrayChange("education")}
                />
              </div>
              <div className="es-full">
                <label className="label-txt">Interests (comma separated)</label>
                <input
                  className="input-field"
                  value={profile?.interest?.join(", ")}
                  onChange={handleArrayChange("interest")}
                />
              </div>
            </div>
          </div>
          <div className="pg-hacts">
            <button
              className="btn-gold save-btn"
              style={{ color: "blue", padding: "2px 8px" }}
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
