import { Link, useMatchRoute, type LinkProps } from '@tanstack/react-router';
import { ClipboardListIcon, HandshakeIcon, LayoutDashboardIcon, PackageSearchIcon, type LucideIcon } from 'lucide-react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface NavItem {
    title: string;
    to: LinkProps['to'];
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    { title: 'Dashboard', to: '/dashboard', icon: LayoutDashboardIcon },
    { title: 'Found items', to: '/found-items', icon: PackageSearchIcon },
    { title: 'Inquiries', to: '/inquiries', icon: ClipboardListIcon },
    { title: 'Returns', to: '/returns', icon: HandshakeIcon },
];

export function NavMain() {
    const matchRoute = useMatchRoute();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton render={<Link to={item.to} />} isActive={!!matchRoute({ to: item.to })} tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
