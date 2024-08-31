"use client";

import { useParams, useRouter } from "next/navigation";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";
import { useModal, ModalType } from "@/hooks/use-modal-store";

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (event: React.MouseEvent, action: ModalType) => {
    event.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          `group mb-1 flex w-full items-center gap-x-2 rounded-md p-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50`,
          params?.channelId === channel.id && "bg-zinc-700/20",
        )}
      >
        <Icon className="flex size-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
        <p
          className={cn(
            `line-clamp-1 text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300`,
            params?.channelId === channel.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white",
          )}
        >
          {channel.name}
        </p>
        {channel.name !== "general" && role !== MemberRole.GUEST && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="Edit">
              <Edit
                onClick={(event) => onAction(event, "editChannel")}
                className="hidden size-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={(event) => onAction(event, "deleteChannel")}
                className="hidden size-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
          </div>
        )}
        {channel.name === "general" && (
          <Lock className="ml-auto size-4 text-zinc-500 dark:text-zinc-400" />
        )}
      </button>
    </>
  );
};
