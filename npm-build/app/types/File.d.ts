export declare type File = {
    path: string;
    isDir: boolean;
    parent: string;
    mimeType: string;
    depth: number;
};
export declare type Files = Array<File>;
