import { selectCurrentPlaying } from "../features/watch/watchSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useFetch = ({ trigger, id, setState, fetchWhat, argument = true, finallyWork = null}) => {
    const currentPlayingVideo = useSelector(selectCurrentPlaying);

    useEffect(() => {
        const fetchData = async () => {
            let response = null;
            try {
                response = argument ? await trigger({ id }).unwrap()
                    : await trigger({}).unwrap();

                if (setState) setState(response.items);
            } catch (err) {
                console.log(`Error in fetching ${fetchWhat}`, err);
            } finally {
                if (typeof finallyWork === "function") {
                    finallyWork(response);
                }
            }
        }

        fetchData();
    }, [currentPlayingVideo])
}

export default useFetch;