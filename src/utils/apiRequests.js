import { publicRequest } from "./requestMethod";



export const fetcher = async(setLoading, setData, url) => {
    setLoading(true);
    try {
        const res = await publicRequest.get(url);
        setData(res.data)
        setLoading(false);
    } catch (error) {
        console.log(error)
        setLoading(false);
    }
}
