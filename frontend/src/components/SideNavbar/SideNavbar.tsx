import React from "react";
import NavItem from "../NavItem/NavItem";

interface SideNavbarProps {
  children?: React.ReactNode;
}
const SideNavbar: React.FC<SideNavbarProps> = ({children}) => {
  return (
    <div className="h-screen w-64 bg-primary p-4 rounded-r-xl">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Brand</h2>
      </div>

      {/* <ul>
        <li className="mb-4 ml-3 hover:text-indigo-900 hover:font-medium">
          Dashboard
        </li>
        <li className="mb-4 ml-3 hover:text-indigo-900 hover:font-medium">
          Profile
        </li>
        <li className="mb-4 ml-3 hover:text-indigo-900 hover:font-medium">
          Settings
        </li>
        <li className="mb-4 ml-3 hover:text-indigo-900 hover:font-medium">Logout</li>
      </ul> */}
      <div className="flex flex-col space-y-2">
        {children}
      </div>
    </div>
  );
};

export default SideNavbar;
