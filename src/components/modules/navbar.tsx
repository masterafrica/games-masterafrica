import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Search, Menu, X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "@/lib/auth-context";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Challenge", to: "/challenges" },
  { label: "Games", to: "/games" },
  { label: "Leaderboard", to: "/leaderboard" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav className="border-b border-gray-200/0 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Avatar
                className="w-10 h-10"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
              <div className="hidden sm:block">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Welcome,
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {String(user?.username || user?.email).split("@")[0] ||
                    "Guest"}
                </p>
              </div>
            </div>

            {/* <Input
              classNames={{
                mainWrapper: "rounded-full!",
              }}
              placeholder="Search"
              size="sm"
              startContent={<Search className="w-4 h-4 text-gray-400" />}
            /> */}

            <div className="hidden md:block">
              <img alt="Reward" className="w-20" src="/images/reward.png" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img alt="Logo" className="w-16" src="/images/logo.svg" />
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    isActive(item.to)
                      ? "text-primary font-semibold"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                className="font-semibold rounded-full bg-primary text-white"
                size="sm"
                startContent={<LogOut className="w-4 h-4" />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                aria-label="Toggle menu"
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800"
                onClick={() => setOpen((s) => !s)}
              >
                {open ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    isActive(item.to)
                      ? "text-primary font-semibold"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                  to={item.to}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                className="mt-2 w-full font-semibold rounded-full bg-primary text-white"
                size="sm"
                startContent={<LogOut className="w-4 h-4" />}
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
