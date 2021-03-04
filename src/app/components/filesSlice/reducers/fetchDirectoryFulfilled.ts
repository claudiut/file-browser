/* eslint-disable no-param-reassign */
import { alphaSortFilesOfDir } from '../../../helpers/file';
import { FilesState } from '../../../types/AppState';
import Directory from '../../../types/Directory';
import setSelectedByPath from './setSelectedByPath';

type Action = {
    payload: Directory[]|Directory,
    meta: { arg: { sliceChildren: boolean, path: string, withParentsTopParent?: string } }
};

export default (
    (state: FilesState, action: Action): void => {
        const { path, sliceChildren, withParentsTopParent } = action.meta.arg;
        state.isFetching = false;
        // when receiving a list of directories
        if (Array.isArray(action.payload)) {
            const fetchedDirs = action.payload.map(alphaSortFilesOfDir);
            if (withParentsTopParent) {
                state.data = state.data.slice(0, -1 * fetchedDirs.length).concat(fetchedDirs);
            } else {
                // replace
                state.data = fetchedDirs;
            }

            setSelectedByPath(state, { payload: { path, directories: state.data } });
            return;
        }

        const directory = alphaSortFilesOfDir(action.payload);

        // add a directory and remove the unnecessary dirs, in case a parent dir gets selected
        if (sliceChildren !== false) {
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
