import { Hash } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";

type Props = {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
};

export const ChatHeader = ({ serverId, name, type, imageUrl }: Props) => {
  return (
    <div className="text-md font-seminold flex h-12 items-center border-b-2 border-neutral-200 px-3 dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="ml-2 size-5 text-zinc-500 dark:text-zinc-400" />
      )}
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
    </div>
  );
};
