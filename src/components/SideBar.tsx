import React from "react";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-start gap-y-4">
        <ul>
          <li>Recent</li>
          <li>Find creators</li>
          <li>Notifications</li>
          <li>
            <Button variant="ghost" >Wallet</Button>
          </li>
          <li>Settings</li>
        </ul>
        <p>
          <u>Memberships</u>
        </p>
        <ul>
          <li>spacemen2202</li>
          <li>highernature</li>
          <li>earthpreservarance</li>
        </ul>
      </div>
      <div>
        {/* <CreateAccBtn />
        <UserPanel
          name={name}
          isMember={isMember}
          handleLogout={handleLogout}
        /> */}
      </div>
    </div>
  );
}
