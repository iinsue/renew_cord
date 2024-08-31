import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";

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
      </div>
    </>
  );
};

export default ChannelPage;
