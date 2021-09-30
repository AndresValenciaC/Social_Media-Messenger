import React from "react";
import "./topBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function TopBar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link style={{ textDecoration: "none" }} to="/">
          <span className="logoBarLeft">Drs Social Media</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <SearchBar />
      </div>
      <div className="topBarRight">
        <div className="topBarLinks">
          <span className="topBarLink">Home</span>

          <span className="topBarLink">TimeLine</span>
        </div>
        <div className="topBarIcons">
          <div className="topBarItems">
            <Person />
            <span className="topBarIconBadge">5</span>
          </div>
          <div className="topBarItems">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/messenger/${user.username} `}
            >
              <Chat />
              <span className="topBarIconBadge">2</span>
            </Link>
          </div>

          <div className="topBarItems">
            <Notifications />
            <span className="topBarIconBadge">5</span>
          </div>
        </div>

        <Link to={`/profile/${user.username} `}>
          <img
            src={user.profilePicture || "/assets/userPic.png"}
            alt=""
            className="topBarImg"
          />
        </Link>
      </div>
    </div>
  );
}
