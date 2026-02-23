"use client";
import { authClient } from "../lib/auth-client";

type Props = {
  className?: string;
};
export default function UserName({ className = "" }: Props) {
  const { data } = authClient.useSession();
  if (!data) return null;

  const firstName = data.user.name?.split(" ")[0];
  if (firstName) return <span className="">{firstName}</span>;

  return (
    <span>
      <span className="text-primary font-bold">
        , {firstName[0].toUpperCase()}
        {firstName.slice(1).toLowerCase()}
      </span>
    </span>
  );
}
