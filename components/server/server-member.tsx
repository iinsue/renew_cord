"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";

type ServerMemberProps = {
  member: Member & { profile: Profile };
  server: Server;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-2 size-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="ml-2 size-4 text-rose-500" />,
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();

  const icon = roleIconMap[member.role];

  return (
    <>
      <button
        className={cn(
          "group mb-1 flex w-full items-center gap-x-2 rounded-md p-2 transition hover:bg-zinc-700 dark:hover:bg-zinc-700/50",
          params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700",
        )}
      >
        <UserAvatar
          src={member.profile.imageUrl}
          className="size-8 md:size-8"
        />
        {icon}
        <p
          className={cn(
            "text-sm font-semibold text-zinc-500 group-hover:text-zinc-600",
            "transition dark:text-zinc-400 dark:group-hover:text-zinc-300",
            params?.channelId === member.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white",
          )}
        >
          {member.profile.name}
        </p>
      </button>
    </>
  );
};
