import React from "react";
import "./home.css";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import TopBar from "../../Components/TopBar/TopBar";
import Feed from "../../Components/Feed/Feed";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
export default function Home() {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <LeftSideBar />
        <Feed />
        <RightSideBar />
      </div>
    </>
  );
}
