import React from "react";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import { User } from "../../services/Api/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigation } from "react-router-dom";

function Login() {
  const navigate = useNavigation();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: User.loginUser,

    onSuccess: (data) => {
      toast.success(data?.message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    mutate(userData);
    navigate("/dashboard");
  };

  return (
    <div className="page page-fade" id="pg-login">
      <div className="auth-wrap">
        <div className="auth-left">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80"
            alt="Love"
          />
          <div className="auth-left-overlay"></div>
          <div className="auth-left-content">
            <div className="auth-left-quote">
              "You know you're in love when you can't fall asleep because
              reality is finally better than your dreams."
            </div>
            <div className="auth-left-author">— Dr. Seuss</div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-logo">
            HertLink<span>.</span>
          </div>
          <h1 className="auth-title">
            Welcome<em> Back</em>
          </h1>
          <p className="auth-sub">
            Sign in to continue your journey to love. Your matches are waiting.
          </p>
          <div className="auth-form">
            <div className="auth-social">
              <button className="auth-soc-btn">🌐 Continue with Google</button>
              <button className="auth-soc-btn">🍎 Apple</button>
            </div>
            <div className="auth-divider">or sign in with email</div>
            <div>
              <label className="label-txt">Email Address</label>
              <input
                className="input-field"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setuserData({ ...userData, email: e.target.value })
                }
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label
                className="label-txt"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Password</span>
                <a
                  href="#"
                  style={{
                    color: "var(--rose)",
                    textDecoration: "none",
                    fontSize: "12px",
                  }}
                >
                  Forgot password?
                </a>
              </label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                value={userData.password}
                onChange={(e) =>
                  setuserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <button
              className="btn-primary auth-submit"
              type="submit"
              onClick={handleLogin}
            >
              {!isPending ? "Sign In →" : "Sign In....."}
            </button>
            <p className="auth-switch">
              New to Velour? <a href="/register">Create a free account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
