import { Files } from './File';

type Directory = {
    files: Files,
    parentPath: string,
    depth: number,
}

export default Directory;
