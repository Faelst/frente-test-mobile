import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from '../services/auth';
import { SignInPayload, SignInResponse } from '../types/auth';

type User = {
    name: string;
    email: string;
};

type AuthContextData = {
    user: User | null;
    token: string | null;
    loading: boolean;
    signInUser: (data: SignInPayload) => Promise<void>;
    signOutUser: () => Promise<void>;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        })();
    }, []);

    async function signInUser(data: SignInPayload) {
        const response: SignInResponse = await signIn(data);
        setUser({ name: response.name, email: response.email });
        setToken(response.token);

        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify({ name: response.name, email: response.email }));
    }

    async function signOutUser() {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                signInUser,
                signOutUser,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
