// Node modules
import { create, type StateCreator } from "zustand";
import type { ReactNode } from "react";

interface Store {
  /** The component currently displayed inside the modal. */
  modal: ReactNode;

  /** Method to close the modal. */
  closeModal: () => void;

  /** Method to set and automatically show the modal with a component. */
  setModal: (component: ReactNode) => void;
}

const store: StateCreator<Store> = (set) => ({
  modal: null,
  closeModal: () => set({ modal: null }),
  setModal: (component) => set({ modal: component }),
});

const useModal = create<Store>()(store);

export default useModal;
