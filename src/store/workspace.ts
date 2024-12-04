import { create } from "zustand";

type WorkspaceStoreProps = {
    open: boolean;
    setOpen: (val: boolean) => void
};

export const useWorkspaceStore = create<WorkspaceStoreProps>((set) => ({
    open: false,
    setOpen: (val) => set(() => ({ open: val }))
}));