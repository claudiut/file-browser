import { useRef, useEffect } from 'react';
import Directory from '../types/Directory';

type Value = number | string | Array<Directory> | undefined;

const usePrevious = (value: Value): Value => {
    const ref = useRef() as React.MutableRefObject<Value>;
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default usePrevious;
