export type FileType = "png" | "jpeg";

export type Issue = {
    bodyText: string;
    publishedAt: string;
    id: string;
    author: {
        login: string;
    }
}

export type Discussion = {
    bodyText: string;
    publishedAt: string;
    id: string;
    author: {
        login: string;
    }
}