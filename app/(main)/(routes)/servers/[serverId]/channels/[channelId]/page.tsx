import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-message";
import { MediaRoom } from "@/components/media-room";
import { ChannelType } from "@prisma/client";

type Props = {
  params: {
    serverId: string;
    channelId: string;
  };
};

const ChannelPage = async ({ params }: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <>
      <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
        <ChatHeader
          name={channel.name}
          serverId={channel.serverId}
          type="channel"
        />
        {channel.type === ChannelType.TEXT && (
          <>
            <ChatMessages
              member={member}
              name={channel.name}
              chatId={channel.id}
              type="channel"
              apiUrl="/api/messages"
              socketUrl="/api/socket/messages"
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
              paramKey="channelId"
              paramValue={channel.id}
            />
            <ChatInput
              name={channel.name}
              type="channel"
              apiUrl="/api/socket/messages"
              query={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
            />
          </>
        )}
        {channel.type === ChannelType.AUDIO && (
          <MediaRoom chatId={channel.id} video={false} audio={true} />
        )}
        {channel.type === ChannelType.VIDEO && (
          <MediaRoom chatId={channel.id} video={true} audio={true} />
        )}
      </div>
    </>
  );
};

export default ChannelPage;
