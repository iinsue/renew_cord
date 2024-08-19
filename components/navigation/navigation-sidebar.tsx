import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  // root로 가면 프로필 API를 타게 된다.
  if (!profile) {
    return redirect("/");
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
      <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]">
        Navigation Sidebar
      </div>
    </>
  );
};
