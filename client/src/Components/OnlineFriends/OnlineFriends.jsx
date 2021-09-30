import React from "react";
import "./onlineFriends.css";
//import { Users } from "../../dummyData";
export default function OnlineFriends({ user }) {
  return (
    <div className="onlineFriendsContainer">
      <h4 className="friendsTitle">Online friends</h4>
      <ul className="onlineFriendList">
        <li className="onlineFriend">
          <div className="onlineFriendImgContainer">
            <img src={user.profilePicture} alt="" className="onlineFriendImg" />
            <span className="badgeOnlineFriend"></span>
          </div>
          <span className="onlineFriendTxt">{user.username}</span>
        </li>
      </ul>
    </div>
  );
}
