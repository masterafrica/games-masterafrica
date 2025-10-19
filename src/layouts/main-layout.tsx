import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/modules/navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
