
import { create } from "zustand";

type ChannelStoreProps = {
    open: boolean;
    setOpen: (val: boolean) => void
};

export const useChannelStore = create<ChannelStoreProps>((set) => ({
    open: false,
    setOpen: (val) => set(() => ({ open: val }))
}));