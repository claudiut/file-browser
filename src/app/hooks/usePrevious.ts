import { useRef, useEffect } from 'react';
import Directory from '../types/Directory';
import QsParsedValue from '../types/QsParsedValue';

type Value = Array<Directory> | QsParsedValue;

const usePrevious = (value: Value): Value => {
    const ref = useRef() as React.MutableRefObject<Value>;
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default usePrevious;
