// Dependencies: pnpm install @radix-ui/react-tooltip

"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = {
  btnText?: string;
  copyText: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
};

const CopyButton = ({
  btnText,
  copyText,
  variant = "outline",
  size = "icon"
}: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className="disabled:opacity-100 flex items-center"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            disabled={copied}
          >
            <div
              className={cn(
                "transition-all",
                copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
            >
              <Check className="stroke-emerald-500" size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            <div
              className={cn(
                "absolute transition-all flex items-center gap-x-2",
                copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
              )}
            >
              {btnText && <span className="">{btnText}</span>}
              <Copy size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Click to copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CopyButton;
