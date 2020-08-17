import { useRef, useEffect } from 'react';
import Directory from '../types/Directory';
import { Files } from '../types/File';

type Value = number | string | Array<Directory> | Files | undefined;

const usePrevious = (value: Value): Value => {
    const ref = useRef() as React.MutableRefObject<Value>;
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default usePrevious;
