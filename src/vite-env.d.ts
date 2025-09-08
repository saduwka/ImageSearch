/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PIXABAY_KEY: string;
    readonly VITE_UNSPLASH_KEY: string;
    readonly VITE_PEXELS_KEY: string;
    readonly VITE_NASA_KEY?: string; // если NASA key нужен
    // сюда же добавляй остальные
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
