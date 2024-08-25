import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel";

type ModalDataType = {
  server?: Server;
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
