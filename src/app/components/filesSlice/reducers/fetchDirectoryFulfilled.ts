/* eslint-disable no-param-reassign */
import { alphaSortFilesOfDir } from '../../../helpers/file';
import { FilesState } from '../../../types/AppState';
import Directory from '../../../types/Directory';

type Action = { payload: Directory[]|Directory, meta: { arg: { sliceChildren: boolean } } };

export default (
    (state: FilesState, action: Action): void => {
        state.isFetching = false;

        // when receiving a list of directories
        if (Array.isArray(action.payload)) {
            state.data = action.payload.map(alphaSortFilesOfDir);
            return;
        }

        const directory = alphaSortFilesOfDir(action.payload);

        // add a directory and remove the unnecessary dirs, in case a parent dir gets selected
        if (action.meta.arg.sliceChildren !== false) {
            state.data = state.data.slice(0, directory.depth);
            state.data.push(directory);
            return;
        }

        // overwrite/refresh a specific directory (e.g.: when after uploading a file)
        const dirIndex = state.data.findIndex(
            ({ parentPath }: Directory) => parentPath === directory.parentPath,
        );
        if (dirIndex !== -1) {
            state.data[dirIndex] = directory;
        }
    }
);
