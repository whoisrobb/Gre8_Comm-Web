import CreateWorkspace from '@/components/elements/create-workspace';
import Toolbar from '@/components/layouts/toolbar';
import React from 'react'

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
        <div className="bg-background shadow h-[200vh]">

          {children}
        </div>
      </div>
    </div>
  )
}

export default WorkspaceLayout;
