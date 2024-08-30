import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { Separator } from "@/components/ui/separator";

import { NavigationAction } from "./navigation-action";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  // root로 가면 프로필 API를 타게 된다.
  if (!profile) {
    return redirect("/sign-in");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <>
      <div className="flex h-full w-full flex-col items-center space-y-4 bg-[#E3E5E8] py-3 text-primary dark:bg-[#1E1F22]">
        <NavigationAction />
        <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
        <ScrollArea className="w-full flex-1">
          {servers.map((server) => (
            <div key={server.id} className="mb-4">
              <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))}
        </ScrollArea>
        <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
          <ModeToggle />
          <UserButton
            afterSwitchSessionUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "size-12",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};
