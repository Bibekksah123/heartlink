import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" >
          <img src="/tab_icons.png" alt="" style={{ width: "150px" }} />
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "sb-item active" : "sb-item")}
      >
        <div className="sb-icon">🔥</div>
        Discover
      </NavLink>
      <NavLink
        to="/matches"
        className={({ isActive }) => (isActive ? "sb-item active" : "sb-item")}
      >
        <div className="sb-icon">♥</div>
        Matches
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) => (isActive ? "sb-item active" : "sb-item")}
      >
        <div className="sb-icon">💬</div>
        Chat
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "sb-item active" : "sb-item")}
      >
        <div className="sb-icon">👤</div>
        Profile
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? "sb-item active" : "sb-item")}
      >
        <div className="sb-icon">⚙️</div>
        Settings
      </NavLink>
    </aside>
  );
}

export default Sidebar;
