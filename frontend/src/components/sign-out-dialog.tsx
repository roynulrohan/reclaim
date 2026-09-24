import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SignOutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        onOpenChange(false);
        auth.logout();
        navigate({ to: '/' });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-sm'>
                <DialogHeader>
                    <DialogTitle>Log out?</DialogTitle>
                    <DialogDescription>You'll need to log in again to get back to the dashboard.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant='outline' />}>Cancel</DialogClose>
                    <Button variant='destructive' onClick={handleSignOut}>
                        Log out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
