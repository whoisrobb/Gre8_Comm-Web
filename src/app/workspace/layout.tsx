import CreateWorkspace from '@/components/elements/create-workspace';
import React from 'react'

const WorkspaceLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <CreateWorkspace />
      {children}
    </div>
  )
}

export default WorkspaceLayout;
