'use client';
import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ManagementSidebar } from '@/components/manage/sidebar';

export default function ManageLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ManagementSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
