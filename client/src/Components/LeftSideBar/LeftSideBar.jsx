import React from "react";
import "./leftSideBar.css";
import {
  RssFeed,
  Bookmarks,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import ListFriends from "../ListFriends/ListFriends";
export default function LeftSideBar() {
  const LeftSideBarTop = () => {
    return (
      <>
        <ul className="sideBarList">
          <li className="listItem">
            <RssFeed className="sideBarIcon" />
            <span className="listItemTxt">Feed</span>
          </li>
          <li className="listItem">
            <Bookmarks className="sideBarIcon" />
            <span className="listItemTxt">Bookmarks</span>
          </li>
          <li className="listItem">
            <HelpOutline className="sideBarIcon" />
            <span className="listItemTxt">Help</span>
          </li>
          <li className="listItem">
            <WorkOutline className="sideBarIcon" />
            <span className="listItemTxt">Work</span>
          </li>
          <li className="listItem">
            <Event className="sideBarIcon" />
            <span className="listItemTxt">Event</span>
          </li>
          <li className="listItem">
            <School className="sideBarIcon" />
            <span className="listItemTxt">School</span>
          </li>
        </ul>
        <button className="sideBarBtn">Show more</button>
        <hr className="sideBarHr" />
      </>
    );
  };

  return (
    <div className="leftSideBarContainer">
      <div className="leftSideBarWrapper">
        <LeftSideBarTop /> <ListFriends />
      </div>
    </div>
  );
}
