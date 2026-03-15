import React, { useState } from "react";
import "./PasswordSecurity.css";
import { useMutation } from "@tanstack/react-query";
import { User } from "../../../services/Api/user";
import toast from "react-hot-toast";


function SecurityCard() {
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  } );
  

   const { mutate:passwordChangeMutation } = useMutation({
    mutationFn: User.changePassword,

     onSuccess: ( data ) => {
      toast.success(data?.data?.message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  
  const handlePasswordChange = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordChange;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    const passwordData = {
      currentPassword,
      newPassword
    }
    passwordChangeMutation(passwordData)

  }
  return (
    <div className="security-wrapper">
      <h2 className="security-title">Security</h2>

      <div className="security-card">
        <div className="icon-box">🔒</div>

        <div className="form-content">
          <div className="input-group">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordChange.currentPassword}
              onChange={(e) =>
                setPasswordChange((pre) => ({
                  ...pre,
                  currentPassword: e.target.value,
                }))
              }
              placeholder="Enter current password"
            />
          </div>

          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={passwordChange.newPassword}
              onChange={(e) =>
                setPasswordChange((pre) => ({
                  ...pre,
                  newPassword: e.target.value,
                }))
              }
              placeholder="Enter new password"
            />
          </div>

          <div className="input-group">
            <label>Confirm new Password</label>
            <input
              type="password"
              value={passwordChange.confirmPassword}
              onChange={(e) =>
                setPasswordChange((pre) => ({
                  ...pre,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Confirm new password"
            />
          </div>

          <div className="button-group">
            <button className="btn-primary" onClick={handlePasswordChange}>
              Change Password
            </button>
            <button className="btn-secondary">Cancel</button>
          </div>

          <div className="password-requirements">
            <span>Password requirements:</span> Use at least 8 characters with a
            mix of letters, numbers, and symbols.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityCard;
