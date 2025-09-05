export interface AppImage {
    id: string;               // строка, чтобы различать источники
    previewURL: string;
    largeImageURL: string;
    tags: string;
    user: string;
    likes: number;
    views: number;
    downloads: number;
    pageURL: string;          // 🔹 добавляем сюда
    source: "pixabay" | "unsplash"; // можно явно ограничить варианты
}
