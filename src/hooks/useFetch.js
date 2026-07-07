import { selectCurrentPlaying } from "../features/watch/watchSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useFetch = ({ trigger, id, setState, fetchWhat, argument = true, finallyWork = null, dependencies = [] }) => {
    const currentPlayingVideo = useSelector(selectCurrentPlaying);

    useEffect(() => {
        const fetchData = async () => {
            let response = null;
            try {
                response = argument ? await trigger({ id }, true).unwrap()
                    : await trigger({}, true).unwrap();

                if (setState) {
                    if (response.items) {
                        setState(response.items)
                    } else if (response.data) {
                        setState(response.data)
                    }   
                };
            } catch (err) {
                console.log(`Error in fetching ${fetchWhat}`, err);
            } finally {
                if (typeof finallyWork === "function") {
                    finallyWork(response);
                }
            }
        }

        fetchData();
    }, [currentPlayingVideo, id, ...dependencies, trigger, setState, finallyWork, argument, fetchWhat])
}

export default useFetch;