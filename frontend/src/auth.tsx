import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, TOKEN_KEY } from '@/lib/api';

export type Role = 'ADMIN' | 'STAFF';

export interface User {
    id: number;
    username: string;
    role: Role;
}

interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(() => localStorage.getItem(TOKEN_KEY) !== null);

    // Restore auth state on app load
    useEffect(() => {
        if (!localStorage.getItem(TOKEN_KEY)) {
            return;
        }
        api.get<User>('/api/auth/me')
            .then((response) => setUser(response.data))
            .catch(() => localStorage.removeItem(TOKEN_KEY))
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (username: string, password: string) => {
        const response = await api.post<LoginResponse>('/api/auth/login', { username, password });
        localStorage.setItem(TOKEN_KEY, response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    };

    if (isLoading) {
        return null;
    }

    return <AuthContext value={{ user, isAuthenticated: user !== null, login, logout }}>{children}</AuthContext>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
