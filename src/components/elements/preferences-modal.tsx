import React, { Dispatch, SetStateAction } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";

type PreferencesModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    initialValue: string;
};

const PreferencesModal = ({ open, setOpen, initialValue }: PreferencesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    
                </DialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default PreferencesModal;
