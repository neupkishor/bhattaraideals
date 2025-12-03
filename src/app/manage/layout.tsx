'use client';
import { ReactNode, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ManagementSidebar } from '@/components/manage/sidebar';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function ManageLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // For now, we assume any logged in user can access /manage.
    // In a real app, you'd check for an admin role here.
    if (!isUserLoading && !user) {
      router.push('/'); // Redirect to home if not logged in
    }
  }, [isUserLoading, user, router]);


  if (isUserLoading || !user) {
    // Show a loading state or nothing while we determine auth state and redirect
    return <div>Loading...</div>;
  }
  
  return (
    <SidebarProvider>
      <ManagementSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
