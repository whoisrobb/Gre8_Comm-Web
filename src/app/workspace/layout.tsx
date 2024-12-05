import React from 'react';
import CreateWorkspace from '@/components/elements/create-workspace';
import Toolbar from '@/components/layouts/toolbar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from '@/components/layouts/sidebar';

const WorkspaceLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='bg-stone-50'>
      <CreateWorkspace />

      <div className="grid gap-4 grid-cols-[3rem_1fr] p-2">
        <Toolbar />
        <div className="bg-background shadow min-h-[calc(100vh-2rem)]">
          <ResizablePanelGroup
            direction='horizontal'
            autoSaveId={"gre8i-workspace-layout"}
          >
            <ResizablePanel
              defaultSize={20}
              minSize={11}
            >
              <Sidebar />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={20}>
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLayout;
