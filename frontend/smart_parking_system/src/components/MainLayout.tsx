import { Outlet } from "react-router-dom";



function MainLayout() {
  return (
    <main className="container">
      <div className="bg-light p-5 rounded"><Outlet/></div>
    </main>
  );
}

export default MainLayout;
