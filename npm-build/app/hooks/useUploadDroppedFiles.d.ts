import { FileWithPath } from 'react-dropzone';
declare type OnDropFiles = (droppedFiles: FileWithPath[]) => Promise<void>;
declare const useUploadDroppedFiles: (parentPath: string) => OnDropFiles;
export default useUploadDroppedFiles;
