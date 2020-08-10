export type File = {
    path: string,
    isDir: boolean,
    parent: string,
    depth: number,
};

export type Files = Array<File>;
