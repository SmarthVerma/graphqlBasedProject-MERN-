import React, { ReactNode } from "react";

export function GridBackground({ children }: { children: ReactNode }) {
  return (
    <div className="h-[50rem] w-full border border-red-400  dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center border border-green-500 justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20 bg-clip-text text-transparent bg-gradient-to-b border border-blue-700 from-neutral-200 to-neutral-500 py-8">
      {children}
      </div>
    </div>
  );
}
