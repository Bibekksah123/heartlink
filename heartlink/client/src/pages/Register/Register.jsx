import React from "react";
import "./register.css";
import { useState } from "react";
import { User } from "../../services/Api/user";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "react-router-dom";



function Register() {
  const navigate=useNavigation()
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
  } );
  
const { mutate, isPending } = useMutation({
  mutationFn: User.createUser,

  onSuccess: ( data ) => {
    toast.success( data?.message );
  },

  onError: ( error ) => {
    toast.error(error?.response?.data?.message || "Registration failed");
  },
});

const handleRegisternation = async () => {
  if (
    !userData.name ||
    !userData.email ||
    !userData.password ||
    !userData.dateOfBirth
  ) {
    toast.error("Please fill in all fields");
    return;
  }

  mutate( userData );
    navigate("/login");
  
};

  return (
    <div className="page page-fade" id="pg-signup">
      <div className="auth-wrap">
        <div className="auth-left">
          <img
            src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=900&q=80"
            alt="Love"
          />
          <div className="auth-left-overlay"></div>
          <div className="auth-left-content">
            <div className="auth-left-quote">
              "The best love is the kind that awakens the soul and makes us
              reach for more."
            </div>
            <div className="auth-left-author">— Nicholas Sparks</div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-logo">
            HeartLink<span>.</span>
          </div>
          <h1 className="auth-title">
            Begin Your<em> Journey</em>
          </h1>
          <p className="auth-sub">
            Create your free account and start meeting people who truly match
            your soul.
          </p>
          <div className="auth-form">
            <div className="auth-social">
              <button className="auth-soc-btn">🌐 Continue with Google</button>
              <button className="auth-soc-btn">🍎 Apple</button>
            </div>
            <div className="auth-divider">or</div>
            <div className="auth-row">
              <div>
                <label className="label-txt">First Name</label>
                <input
                  className="input-field"
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setuserData({ ...userData, name: e.target.value })
                  }
                  placeholder="Sofia"
                />
              </div>
            </div>
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
              <label className="label-txt">Password</label>
              <input
                className="input-field"
                type="password"
                value={userData.password}
                min={8}
                onChange={(e) =>
                  setuserData({ ...userData, password: e.target.value })
                }
                placeholder="Min. 8 characters"
              />
              <p className="pass-req">
                Use letters, numbers, and symbols for a strong password.
              </p>
            </div>
            <div className="auth-row">
              <div>
                <label className="label-txt">Date of Birth</label>
                <input
                  className="input-field"
                  value={userData.dateOfBirth}
                  onChange={(e) =>
                    setuserData({ ...userData, dateOfBirth: e.target.value })
                  }
                  type="date"
                />
              </div>
              <div>
                <label className="label-txt">I am a</label>
                <select
                  className="input-field"
                  onChange={(e) =>
                    setuserData({ ...userData, gender: e.target.value })
                  }
                >
                  <option value={"female"} style={{ color: "black" }}>
                    Woman
                  </option>
                  <option value={"male"} style={{ color: "black" }}>
                    Man
                  </option>
                  <option value={"non binary"} style={{ color: "black" }}>
                    Non-binary
                  </option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary auth-submit"
              onClick={handleRegisternation}
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Create My Account →"}
            </button>
            <p className="auth-terms">
              By signing up you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </p>
            <p className="auth-switch">
              Already have an account? <a href="login">Sign in here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
