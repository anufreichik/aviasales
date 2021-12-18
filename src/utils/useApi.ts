import {useEffect, useState} from "react";
import axios from "axios";

const useApi = <T>(url: string) => {
    const [result, setResult] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [refreshIndex, setRefreshIndex] = useState(0);
    const refresh = () => {
        setRefreshIndex(refreshIndex + 1);
    };

    useEffect(() => {

        setLoading(true);
        axios.get(url)
            .then(r => {
            setResult(r.data);
            setIsError(false);
            setLoading(false);

        })
            .catch((err) => {
                setLoading(false);
                setIsError(true);
                setResult(null);
            });
        return () => {};
    }, [url, refreshIndex]);

    return [result, loading, isError, refresh] as const;
}
export default useApi;
