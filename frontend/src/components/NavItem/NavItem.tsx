import React from "react";

interface NavItemProps {
  label: string;
  onClick?: () => void; // camelCase!
  active?:boolean;
}

const NavItem: React.FC<NavItemProps> = ({label, onClick ,active}) =>{
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded transition  text-white
        ${active == true ? "bg-primary-active  font-semibold" :""} 
         hover:font-bold`}
    >
      {label}
    </button>
  )
}

export default NavItem