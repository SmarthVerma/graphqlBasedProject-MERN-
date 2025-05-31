import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useApolloClient } from "@apollo/client";

export function AvatarProfile() {
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_AUTHENTICATED_USER });
  // console.log(`this is ur BLOB?`, data);
  // console.log(`client`, client.cache?.data?.data);
  return (
    <div className="w-full flex m-5 justify-center">
      <div className="flex flex-col gapy2">
        <Avatar className="w-24 h-24">
          <AvatarImage src={data?.authUser.profilePicture} alt="@shadcn" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
