// src/pages/FavoritesPage.tsx
import React from "react";
import { useFavorites, useAuth } from "../hooks/useFavorites";

export default function FavoritesPage() {
    const { user } = useAuth();
    const { favorites, loading, remove } = useFavorites();

    if (!user) return <p>Please login to see favourites</p>;
    if (loading) return <p>Loading...</p>;
    if (!favorites.length) return <p>No favorites yet</p>;

    return (
        <div>
            {favorites.map((f, i) => (
                <div key={`${f.source}-${f.id}-${i}`}>
                    <img src={f.previewURL} alt={f.tags} width={200} />
                    <button onClick={() => remove(f)}>Remove</button>
                </div>
            ))}
        </div>
    );
}
