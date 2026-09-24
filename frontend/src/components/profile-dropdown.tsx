import { useState } from 'react';
import { LogOutIcon } from 'lucide-react';
import { useAuth } from '@/auth';
import { SignOutDialog } from '@/components/sign-out-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ProfileDropdown() {
    const { user } = useAuth();
    const [signOutOpen, setSignOutOpen] = useState(false);

    if (!user) {
        return null;
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant='ghost' size='icon' className='rounded-full' aria-label='Open profile menu' />}>
                    <Avatar>
                        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-48' align='end'>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className='font-medium text-foreground'>{user.username}</DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant='destructive' onClick={() => setSignOutOpen(true)}>
                        <LogOutIcon />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
        </>
    );
}
