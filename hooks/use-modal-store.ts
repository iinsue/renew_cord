import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel";

type ModalDataType = {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
};

interface ModalStore {
  type: ModalType | null;
  data: ModalDataType;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalDataType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
