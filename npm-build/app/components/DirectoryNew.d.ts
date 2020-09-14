/// <reference types="react" />
declare type Props = {
    parentPath: string;
    onCancel: () => void;
    onCreated: () => void;
};
declare const DirectoryNew: ({ parentPath, onCreated, onCancel }: Props) => JSX.Element;
export default DirectoryNew;
