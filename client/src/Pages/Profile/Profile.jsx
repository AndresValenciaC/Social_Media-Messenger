import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../../Components/TopBar/TopBar";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import Feed from "../../Components/Feed/Feed";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import "./profile.css";

import { useParams } from "react-router"; // get params from url
export default function Profile() {
  const [user, setUser] = useState([]);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username} `);

      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <TopBar />
      <div className="profileContainer">
        <LeftSideBar />
        <div className="profileRight">
          <div className="profileTop">
            <div className="profileCover">
              <img
                className="profileCoverIMg"
                src={user.coverPicture || "/assets/userPic.png"}
                alt=""
              />
              <img
                className="profilePersonImg"
                src={user.profilePicture || "/assets/logoIcons.jpg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h3 className="profileInfoName">{user.username}</h3>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileBottom">
            <Feed username={username} />
            <RightSideBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
