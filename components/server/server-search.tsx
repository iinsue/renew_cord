"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";

type ServerSearchProps = {
  data: {
    label: string;
    type: "channel" | "member";
    data: { icon: React.ReactNode; name: string; id: string }[] | undefined;
  }[];
};

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "K" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-x-2 rounded-md p-2 transition hover:bg-zinc-700/10 dark:bg-zinc-700/50"
      >
        <Search className="size-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border">
          <span className="text-xs">CTRL</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
