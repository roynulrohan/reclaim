import { useState } from 'react';
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '@/auth';
import { SignOutDialog } from '@/components/sign-out-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

export function NavUser() {
    const { user } = useAuth();
    const { isMobile } = useSidebar();
    const [signOutOpen, setSignOutOpen] = useState(false);

    if (!user) {
        return null;
    }

    const userDetails = (
        <>
            <Avatar>
                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.username}</span>
                <span className='truncate text-xs text-muted-foreground'>{user.role}</span>
            </div>
        </>
    );

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<SidebarMenuButton size='lg' className='aria-expanded:bg-muted' />}>
                            {userDetails}
                            <ChevronsUpDownIcon className='ml-auto size-4' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56' side={isMobile ? 'bottom' : 'right'} align='end' sideOffset={4}>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className='p-0 font-normal text-foreground'>
                                    <div className='flex items-center gap-2 px-1 py-1.5'>{userDetails}</div>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant='destructive' onClick={() => setSignOutOpen(true)}>
                                <LogOutIcon />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>

            <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
        </>
    );
}
