import { useLocation } from 'react-router-dom';
import qs from 'qs';

const usePathQueryStringParam = (): string => {
    const { search } = useLocation();
    return (qs.parse(search.slice(1)).path || '/') as string;
};

export default usePathQueryStringParam;
