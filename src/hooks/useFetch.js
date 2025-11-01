import { selectCurrentPlaying } from "../features/watch/watchSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useFetch = ({ trigger, id, setState, fetchWhat }) => {
    const currentPlayingVideo = useSelector(selectCurrentPlaying);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await trigger({ id }).unwrap();
                setState(response.items)
            } catch (err) {
                console.log(`Error in fetching ${fetchWhat}`, err);
            }
        }

        fetchData();
    }, [currentPlayingVideo])
}

export default useFetch;