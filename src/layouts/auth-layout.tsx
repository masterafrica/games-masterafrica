import { Outlet } from "react-router-dom";

import { subtitle, title } from "@/components/shared/primitives";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          alt="Background"
          className="w-full h-full object-cover"
          src="/images/background.png"
        />
      </div>

      <div className="relative z-10 min-h-screen flex">
        <div className="w-full flex">
          <div className="flex-1 hidden  md:flex flex-col justify-between p-8 lg:p-16">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative">
                <img
                  alt="Game Character"
                  className="w-full h-full object-contain"
                  src="/images/logo.svg"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end max-w-lg">
              <div className="mb-2">
                <p className="text-white/80 text-sm font-medium">
                  Master Africa Games
                </p>
              </div>

              <h1
                className={title({
                  size: "lg",
                  color: "foreground",
                  class: "mb-6 !text-white font-bold",
                })}
              >
                PLAY, WIN & MASTER
                <br />
                YOUR FUTURE
              </h1>

              <p
                className={subtitle({
                  class: "!text-white/70 !text-base max-w-md",
                })}
              >
                The ultimate playground where talents come alive.
              </p>
            </div>

            <div className="mt-8" />
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-lg">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
