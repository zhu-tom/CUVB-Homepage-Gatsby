import React, {useState, useEffect} from 'react';

export default function useDebounce(val, delay) {
    const [debounceVal, setDebounceVal] = useState();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(val);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [val]);

    return debounceVal;
}