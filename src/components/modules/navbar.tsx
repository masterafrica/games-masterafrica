import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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

            <div className="">
              <img src="/images/reward.png" className="w-20" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Logo" className="w-16" />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/challenges"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Challenge
              </Link>
              <Link
                to="/games"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Games
              </Link>
              <Link
                to="/leaderboard"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Leaderboard
              </Link>
            </div>

            <Button
              as={Link}
              to="/auth/signup"
              size="sm"
              className="font-semibold rounded-full bg-primary text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
