import React, { ReactNode } from "react";

export function GridBackground({
  children,
  containerClass,
}: {
  children: ReactNode;
  containerClass?: string;
}) {
  return (
    <div className="w-full min-h-screen   dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div
        className={`absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] ${containerClass}`}
      ></div>
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
