"use client";

import React, { Suspense, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Adjust the import path as needed
import { useGetWorkspace } from "@/hooks/use-get-workspaces";
import { useWorkspaceStore } from "@/store/workspace";

interface WorkspacePageProps {
    data: any[]; // Adjust the type as needed
    isLoading: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const WorkspacePage: React.FC<WorkspacePageProps> = ({ data, isLoading, open, setOpen }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const workspaceId = useMemo(() => data?.[0]?._id, [data]);

    useEffect(() => {
        if (isLoading) return;

        if (workspaceId) {
            router.replace(`/workspace/${workspaceId}`);
        } else if (!open) {
            setOpen(true);
        } else {
            console.log("Open creation modal");
        }
    }, [isLoading, workspaceId, open, setOpen]);

    return (
        <div>
            {/* Your component implementation */}
        </div>
    );
};

const Home = () => {
    const { data, isLoading } = useGetWorkspace();
    const { open, setOpen } = useWorkspaceStore((state) => state);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WorkspacePage data={data ?? []} isLoading={isLoading} open={open} setOpen={setOpen} />
        </Suspense>
    );
};

export default Home;
