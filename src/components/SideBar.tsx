import React from "react";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  return (
    <div className="flex flex-col justify-between p-4">
      <div className="flex flex-col items-start gap-y-4">
        <p>
          <u>Memberships</u>
          <br />discord style
        </p>
        <ul>
          <li>spacemen2202</li>
          <li>highernature</li>
          <li>earthpreservarance</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Notifications</li>
          <li>
            <Button variant="ghost">Wallet</Button>
          </li>
          <li>Settings</li>
        </ul>
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
