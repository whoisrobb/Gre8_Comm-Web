"use client";

import { useGetWorkspace } from "@/hooks/use-get-workspaces";
import { useWorkspaceStore } from "@/store/workspace";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const Home = () => {
    const { data, isLoading } = useGetWorkspace();
    const { open, setOpen } = useWorkspaceStore((state) => state);
    const router = useRouter();

    const workspaceId = useMemo(() => data?.[0]?._id,[data]);

    useEffect(() => {
        if (isLoading) return;
        
        if (workspaceId) {
            router.replace(`/workspace/${workspaceId}`);
        } else if (!open) {
            setOpen(true);
        } else {
            console.log("Open creation modal")
        }
    }, [isLoading, workspaceId, open, setOpen]);
  
  return (
    <div>
      
    </div>
  );
}

export default Home;
