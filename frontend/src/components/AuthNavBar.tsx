import React from "react";
import LogoutButton from "./LogoutButton";

export default function AuthNavbar() {
  return (
    <div className="w-full h-max my-3">
      <nav className="bg-transparent text-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Center section */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center relative space-x-4 text-7xl font-extrabold">
                <h1 className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600">
                  Master Expense
                  <span
                    className="absolute rounded-lg  -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-300 to-red-500"
                    style={{
                      maskImage:
                        "linear-gradient(to right, black 0%, black 50%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, black 0%, black 50%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  ></span>
                </h1>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
