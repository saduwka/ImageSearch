// src/hooks/useFavorites.ts
import { useEffect, useState, useCallback } from "react";
import type { AppImage } from "../types";
import { onAuthChange, subscribeFavorites, addFavorite, removeFavorite, loginWithGoogle, logout } from "../services/favorites";
import type { User as FirebaseUser } from "firebase/auth";

export function useAuth() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    useEffect(() => onAuthChange(setUser), []);
    return { user, login: loginWithGoogle, logout };
}

export function useFavorites() {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<AppImage[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            return;
        }
        setLoading(true);
        const unsub = subscribeFavorites(user.uid, (items) => {
            setFavorites(items as AppImage[]);
            setLoading(false);
        });
        return () => unsub();
    }, [user]);

    const add = useCallback(async (image: AppImage) => {
        if (!user) throw new Error("Not authenticated");
        await addFavorite(user.uid, image);
    }, [user]);

    const remove = useCallback(async (image: AppImage) => {
        if (!user) throw new Error("Not authenticated");
        await removeFavorite(user.uid, image);
    }, [user]);

    const isFavorite = useCallback((image: AppImage) => {
        return favorites.some(f => f.id === image.id && f.source === image.source);
    }, [favorites]);

    return { favorites, loading, add, remove, isFavorite };
}
