import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const currentLoggedinEmail = localStorage.getItem("currentUser");
    // console.log("Current logged in email:", currentLoggedinEmail);
    // console.log("Users object:", users);
    if (currentLoggedinEmail && users[currentLoggedinEmail]) {
      setUser(users[currentLoggedinEmail]);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  // console.log("U:", user);
  return (
    <div className="profile">
      <div className="profile-top">
        <p>Account Settings</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="profile-middle">
        <div className="profile-data">
          <div className="profile-img">
            <img
              src="/profile-img.jpg"
              alt="profile-img"
              className="profile-img"
            />
          </div>
          <div className="profile-info">
            <p>{user?.fullName}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="profile-data">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
            exercitationem minus consequuntur est nostrum blanditiis ratione
            itaque labore doloremque neque?
          </p>
        </div>
      </div>
      <hr className="dashed-line" />
      <div className="profile-bottom">
        <hr className="dashed-line bottom-line" />
      </div>
    </div>
  );
};

export default Profile;
