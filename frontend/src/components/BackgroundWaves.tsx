import React, { ReactNode } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { GridBackground } from "./GridBackground";

export function BackgroundWaves({ children }: { children: ReactNode }) {
  return (
    <GridBackground>
      <BackgroundLines className="flex items-center justify-center border w-full flex-col px-4">
        {children}
      </BackgroundLines>
    </GridBackground>
  );
}
