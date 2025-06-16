import React from 'react'
import SideNavbar from '../SideNavbar/SideNavbar';


interface AppLayoutProps {
  navbar: React.ReactNode;       // Sidebar passed as a child
  children: React.ReactNode;     // Main content
}

const AppLayout : React.FC<AppLayoutProps> = ({ navbar,children }) =>  {
   return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {navbar}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default AppLayout