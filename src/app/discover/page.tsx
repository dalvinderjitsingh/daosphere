import Nav from "@/components/nav/Nav";
import React from "react";
import SideBar from "@/components/SideBar";

export default function page() {
  return (
    <div>
      <Nav />
      {/* <div>needs: sidebar, search bar, discover daos</div> */}
      <div className="mt-[76px] grid h-[calc(100vh_-_76px)] grid-cols-[minmax(150px,_25%)_1fr]">
        <SideBar />
        <div className="mainPage bg-zinc-300">
          <h1>SEARCH DATADAOS: ... </h1> <br />
          <h1>DISCOVER DATADAOS: ... </h1>
        </div>
      </div>
    </div>
  );
}
