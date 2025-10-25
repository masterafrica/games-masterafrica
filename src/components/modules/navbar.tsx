import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Challenge", to: "/challenges" },
  { label: "Games", to: "/games" },
  { label: "Leaderboard", to: "/leaderboard" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-b border-gray-200/0 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="sm"
                className="w-10 h-10"
              />
              <div className="hidden sm:block">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Welcome,
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Lopez
                </p>
              </div>
            </div>

            <Input
              placeholder="Search"
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              classNames={{
                mainWrapper: "rounded-full!",
              }}
              size="sm"
            />

            <div className="hidden md:block">
              <img src="/images/reward.png" className="w-20" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Logo" className="w-16" />
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                as={Link}
                to="/auth/signup"
                size="sm"
                className="font-semibold rounded-full bg-primary text-white"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen((s) => !s)}
                aria-label="Toggle menu"
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}

              <Button
                as={Link}
                to="/auth/signup"
                size="sm"
                className="mt-2 w-full font-semibold rounded-full bg-primary text-white"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
