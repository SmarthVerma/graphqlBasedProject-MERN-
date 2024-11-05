import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarProfile() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gapy2">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <p className="text-center">
          <h1 className="text-xl">Smarth</h1>
        </p>
      </div>
    </div>
  );
}
