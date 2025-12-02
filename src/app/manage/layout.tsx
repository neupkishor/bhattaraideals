'use client';
import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ManagementSidebar } from '@/components/manage/sidebar';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function ManageLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // For now, we assume any logged in user can access /manage.
  // In a real app, you'd check for an admin role here.
  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/'); // Redirect to home if not logged in
    return null;
  }

  return (
    <SidebarProvider>
      <ManagementSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
