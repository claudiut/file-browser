import { Files } from './File';
declare type Directory = {
    files: Files;
    parentPath: string;
    depth: number;
};
export default Directory;
