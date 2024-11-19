import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";

type PreviewFilesProps = {
    files: File[];
    previewUrls: string[];
    setPreviewUrls: Dispatch<SetStateAction<string[]>>;
}

const PreviewFiles = ({ files, previewUrls, setPreviewUrls }: PreviewFilesProps) => {
    
    const handleRemove = useCallback((index: number) => {
        const newUrls = [...previewUrls];
        newUrls.splice(index, 1);
        setPreviewUrls(newUrls);
    }, [previewUrls]);

    return (
        <div className="flex items-center">

            {previewUrls.map((fileUrl, index) => (
                <div
                    className=""
                    key={index}
                >
                    <Button
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => handleRemove(index)}
                        className="text-red-500 hover:text-red-700 rounded-full z-50"
                    >
                        <XMarkIcon />
                    </Button>

                    <div
                        className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-input"
                    >
                        <Image
                            className="h-full w-full object-cover z-10"
                            src={fileUrl}
                            alt="Preview of uploaded image"
                            width={32}
                            height={32}
                        />
                    </div>
                </div>
            ))}
        
        </div>
    )
}

export default PreviewFiles;
