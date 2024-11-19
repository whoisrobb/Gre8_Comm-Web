import { Button } from '@/components/ui/button';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

type FileInputProps = {
    setFiles: Dispatch<SetStateAction<File[]>>;
}

const FileInput = ({ setFiles }: FileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);
    
    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files!);
        setFiles((prev) => [...prev, ...newFiles]);
    }, []);

    return (
        <div className="relative inline-block">
            <Button variant={"ghost"} size={"icon"} onClick={handleButtonClick} aria-haspopup="dialog">
                <PaperClipIcon />
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                aria-label="Upload file"
            />
        </div>
    )
}

export default FileInput;
