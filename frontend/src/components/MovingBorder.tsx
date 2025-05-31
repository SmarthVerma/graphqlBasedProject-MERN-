import { Button } from "@/components/ui/moving-border";
import { ReactNode } from "react";

export function MovingBorder({ children }: { children: ReactNode }) {
  return (
    <div>
      <Button
        duration={3000}
        as="div"
        borderRadius="0.75rem"
        borderClassName=" w-24 h-24 bg-[radial-gradient(var(--gray-500)_0%,transparent_30%)]"
        containerClassName="w-max h-max "
        className="bg-white w-96 dark:bg-transparent text-black dark:text-white "
      >
        <p className="h-max rounded-full"></p>
        {children}
      </Button>
    </div>
  );
}
