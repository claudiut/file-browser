/* eslint-disable no-param-reassign */
import { containsFile } from '../../../helpers/file';
import { FilesState } from '../../../types/AppState';
import { File } from '../../../types/File';

type Action = { meta: { arg: { file: File } } };

export default (
    (state: FilesState, { meta: { arg: { file } } }: Action): void => {
        // remove obsolete/deleted selections and directories
        if (containsFile(state.selected, file)) {
            state.selected = state.selected.filter(
                ({ path }: File) => !path.startsWith(file.path),
            );

            const newDirs = [];
            for (const dir of state.data) {
                newDirs.push(dir);
                if (containsFile(dir.files, file)) {
                    break;
                }
            }
            state.data = newDirs;
        }

        // remove the file itself
        state.data = state.data.map((dir) => ({
            ...dir,
            files: dir.files.filter(({ path }) => path !== file.path),
        }));
    }
);
