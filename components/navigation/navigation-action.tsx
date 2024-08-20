"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="bg-backround mx-3 flex size-12 items-center justify-center overflow-hidden rounded-3xl transition-all group-hover:rounded-2xl group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus className="size-6 text-emerald-500 transition group-hover:text-white" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
