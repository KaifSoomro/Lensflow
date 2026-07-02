import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar.jsx"; 
import Topbar from "../components/common/Topbar.jsx"; 

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;