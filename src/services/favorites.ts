// src/services/favorites.ts
import { auth, db, provider } from "../../firebase";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    type User as FirebaseUser
} from "firebase/auth";
import {
    doc,
    setDoc,
    deleteDoc,
    collection,
    onSnapshot,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
    type DocumentData
} from "firebase/firestore";
import type { AppImage } from "../types";

// helpers
const favoriteDocRef = (uid: string, imageId: string) =>
    doc(db, `users/${uid}/favorites/${imageId}`);

export async function loginWithGoogle() {
    const res = await signInWithPopup(auth, provider);
    return res.user;
}

export async function logout() {
    await signOut(auth);
}

// add/update favorite (doc id = `${source}-${id}` to guarantee uniqueness)
export async function addFavorite(uid: string, image: AppImage) {
    const docId = `${image.source}-${image.id}`;
    const ref = favoriteDocRef(uid, docId);
    // store image data (only necessary fields)
    await setDoc(ref, {
        id: image.id,
        source: image.source,
        previewURL: image.previewURL,
        largeImageURL: image.largeImageURL,
        pageURL: image.pageURL,
        tags: image.tags,
        user: image.user,
        addedAt: serverTimestamp(),
    });
}

export async function removeFavorite(uid: string, image: AppImage) {
    const docId = `${image.source}-${image.id}`;
    const ref = favoriteDocRef(uid, docId);
    await deleteDoc(ref);
}

// one-time fetch (if you prefer non-realtime)
export async function getFavoritesOnce(uid: string) {
    const col = collection(db, `users/${uid}/favorites`);
    const q = query(col, orderBy("addedAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as DocumentData);
}

// realtime listener helper: returns unsubscribe
export function subscribeFavorites(uid: string, onUpdate: (items: any[]) => void) {
    const col = collection(db, `users/${uid}/favorites`);
    const q = query(col, orderBy("addedAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const arr = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
        onUpdate(arr);
    }, (err) => {
        console.error("Favorites snapshot error:", err);
    });
}

// auth state observable
export function onAuthChange(cb: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, cb);
}
