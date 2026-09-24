import { useState, type FormEvent } from 'react';
import { AxiosError } from 'axios';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function LoginForm({
    className,
    onLogin,
    ...props
}: Omit<React.ComponentProps<'div'>, 'onSubmit'> & { onLogin: (username: string, password: string) => Promise<void> }) {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setError('');
        setIsPending(true);
        try {
            await onLogin(String(form.get('username')), String(form.get('password')));
        } catch (err) {
            let message = 'Something went wrong!';
            if (err instanceof AxiosError && typeof err.response?.data?.detail === 'string') {
                message = err.response.data.detail;
            }
            setError(message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your username and password to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor='username'>Username</FieldLabel>
                                <Input id='username' name='username' autoComplete='username' required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor='password'>Password</FieldLabel>
                                <Input id='password' name='password' type='password' autoComplete='current-password' required />
                            </Field>
                            {error && <FieldError>{error}</FieldError>}
                            <Field>
                                <Button type='submit' disabled={isPending}>
                                    {isPending ? 'Logging in...' : 'Login'}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
