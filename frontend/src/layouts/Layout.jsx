import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar.jsx";
import Topbar from "../components/common/Topbar.jsx";
import Footer from "../components/common/Footer.jsx";

const Layout = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/", "/illustrations", "/collections"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
          {showFooter && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
