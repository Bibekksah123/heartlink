import React from "react";
import "./Setting.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { User } from "../../services/Api/user";
import toast from "react-hot-toast";

function Setting() {
  const navigate = useNavigate();
  const handleNavigate = (label) => () => {
    // Placeholder navigation/action
    navigate(`${label}`);
  };

  const { mutate: Logout } = useMutation({
    mutationFn: User.logoutUser,
    onSuccess: () => {
      toast.success("logout successfully");
    },
  });

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  return (
    <div className="settings-pg">
      <div className="pg-header">
        <h1 className="pg-title">Settings</h1>
      </div>
      <div className="settings-grid">
        <div className="set-section">
          <div className="set-title">
            <span>⚙️</span>Account
          </div>
          <div className="set-list">
            <div
              className="set-item"
              onClick={handleNavigate("/changepassword")}
            >
              <div className="set-item-left">
                <div className="set-item-icon">🔒</div>
                <div>
                  <div className="set-item-name">Change Password</div>
                </div>
              </div>
              <div className="set-arrow">›</div>
            </div>
            <div className="set-item" onClick={handleNavigate("/profile")}>
              <div className="set-item-left">
                <div className="set-item-icon">👤</div>
                <div>
                  <div className="set-item-name">Edit Profile</div>
                </div>
              </div>
              <div className="set-arrow">›</div>
            </div>
            <div className="set-item" onClick={handleLogout}>
              <div className="set-item-left">
                <div className="set-item-icon">🚪</div>
                <div>
                  <div className="set-item-name">Sign Out</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="set-section">
          <div className="set-title">
            <span>💬</span>Support
          </div>
          <div className="set-list">
            <div className="set-item" onClick={handleNavigate("/contact")}>
              <div className="set-item-left">
                <div className="set-item-icon">📧</div>
                <div>
                  <div className="set-item-name">Contact Us</div>
                </div>
              </div>
              <div className="set-arrow">›</div>
            </div>
          </div>
        </div>
        <div className="set-section">
          <div className="set-title">
            <span>📜</span>Legal
          </div>
          <div className="set-list">
            <div
              className="set-item"
              onClick={handleNavigate("/termsandcondition")}
            >
              <div className="set-item-left">
                <div className="set-item-icon">📄</div>
                <div>
                  <div className="set-item-name">Terms & Services</div>
                </div>
              </div>
              <div className="set-arrow">›</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
