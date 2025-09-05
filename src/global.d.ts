declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

declare module "*.jpeg" {
    const content: string;
    export default content;
}

declare module "*.gif" {
    const content: string;
    export default content;
}

declare module "*.webp" {
    const content: string;
    export default content;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PIXABAY_KEY: string;
    readonly VITE_UNSPLASH_KEY: string;
    // сюда можно добавить ещё свои env
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

