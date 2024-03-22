import Nav from "@/components/nav/Nav";
import React from "react";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      <Nav />
      {/* <div>needs: sidebar, search bar, discover daos</div> */}
      <div className="mt-[76px] grid h-[calc(100vh_-_76px)] grid-cols-[minmax(150px,_25%)_1fr]">
        <SideBar />
        <div className="mainPage bg-zinc-300">
          <h1>home page / dashboard</h1> <br />
          <p>
            todo: create datadao / see list of datadaos user is part of iether
            founder or member. / open a datadao{" "}
          </p>
          <Button>Create DataDAO</Button>
          <br /> <br />
          <h1>Below are the list of DataDAOs youre apart of</h1>
          {/* create list of datadaos */}
          <ul>
            {/* map through list of datadaos and display */}
            {/* {dataDaos.map(dao => ( */}
            {/* display dao name, description, actions */}
            <li>
              <h2>dao.name</h2>
              <p>dao.description</p>
              <Button>View</Button>
            </li>
            <li>
              <h2>dao.name</h2>
              <p>dao.description</p>
              <Button>View</Button>
            </li>
            <li>
              <h2>dao.name</h2>
              <p>dao.description</p>
              <Button>View</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
