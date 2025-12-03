'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Mail, GitPullRequest, Star } from 'lucide-react';

const menuItems = [
  { href: '/manage', label: 'Dashboard', icon: Home },
  { href: '/manage/products', label: 'Products', icon: Package },
  { href: '/manage/inquiries', label: 'Inquiries', icon: Mail },
  { href: '/manage/requests', label: 'Requests', icon: GitPullRequest },
  { href: '/manage/testimonials', label: 'Testimonials', icon: Star },
];

export function ManagementSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h2 className="font-bold text-lg group-data-[collapsible=icon]:hidden">Management</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton isActive={pathname.startsWith(item.href) && item.href !== '/manage' || pathname === '/manage' && item.href === '/manage'} tooltip={item.label}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
