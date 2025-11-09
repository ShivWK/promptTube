import { useLazyGetCommentsQuery } from "../../features/watch/watchApiSlice";
import { selectIsSmall } from "../../features/home/homeSlice";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import Comment from "./CommentCard"
import useFetch from "../../hooks/useFetch";
import { manageComments, selectComments, setComment } from "../../features/userActivity/userActivitySlice";
import { selectUserDetails } from "../../features/auth/authSlice";

const Comments = ({ id }) => {
    const [trigger, { isLoading }] = useLazyGetCommentsQuery();
    const [showCompleteComment, setShowCompleteComment] = useState(false);
    const [comments, setComments] = useState([]);
    const storedComments = useSelector(selectComments)
    const isSmall = useSelector(selectIsSmall);
    const { name, id: userId } = useSelector(selectUserDetails);
    const dispatch = useDispatch();

    useFetch({ trigger, setState: setComments, fetchWhat: "Comments", id })

    const hideButtonClickHandler = (e) => {
        e.stopPropagation();
        setShowCompleteComment(false)
    }

    useEffect(() => {
        if (!isSmall) setShowCompleteComment(true)
    }, [isSmall])

    const commentBoxClickHandler = () => {
        if (isSmall) setShowCompleteComment(true)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const message = e.target.comment.value;
        dispatch(setComment({
            method: "PATCH",
            userId,
            videoId: id,
            comment: {
                snippet: {
                    topLevelComment: {
                        snippet: {
                            authorProfileImageUrl: "",
                            authorDisplayName: `@${name.split(" ").join("").toLowerCase()}`,
                            publishedAt: new Date(),
                            textDisplay: message,
                            deletable: true
                        }
                    }
                }
            }
        }))

        setComments((prv) => {
            return [
                {
                    snippet: {
                        topLevelComment: {
                            snippet: {
                                authorProfileImageUrl: "",
                                authorDisplayName: `@${name.split(" ").join("").toLowerCase()}`,
                                publishedAt: new Date(),
                                textDisplay: message,
                                deletable: true
                            }
                        }
                    }
                },
                ...prv,
            ]
        })
        e.target.comment.value = "";
    }

    // {
    //     authorProfileImageUrl: "",
    //     authorDisplayName: "",
    //     publishedAt: "",
    //     textDisplay: "",
    // }

    useEffect(() => {

    }, [storedComments])

    console.log(comments)

    return (
        isLoading ? <p>Loading...</p>
            : <div onClick={commentBoxClickHandler} className={`relative w-full rounded-md transition-all duration-150 ease-linear dark:bg-gray-800 p-2 pb-1 dark:text-gray-200 mt-1 pretty-scrollbar ${showCompleteComment ? "overflow-auto" : "overflow-hidden cursor-pointer"}`}>

                {showCompleteComment && <div className="flex items-center gap-2 md:gap-3 mb-2 bg-gray-800 w-full">
                    <CircleUserRound size={isSmall ? 55 : 55} strokeWidth={1} className="dark:text-primary" />
                    <form onSubmit={submitHandler} className="bg-gray-900 w-full mx-auto flex items-center justify-between rounded-4xl overflow-hidden border border-gray-700">
                        <input name="comment" className="outline-none border-none w-full py-1 md:py-1.5 pl-3 pr-1.5" placeholder="type your comment..."></input>
                        <button className="bg-primary self-stretch flex items-center justify-center cursor-pointer active:scale-95 transform transition-all duration-150 ease-linear">
                            <i className="ri-send-plane-2-fill px-2 md:px-3 text-2xl md:text-2xl"></i>
                        </button>
                    </form>
                </div>}

                <div className={`${showCompleteComment && "max-md:max-h-[25rem] md:h-auto overflow-auto"} pretty-scrollbar`}>
                    <h2 className="text-sm md:text-sm">
                        <span className="font-medium">Comments</span>
                        {" "}
                        <span className="text-gray-400">{comments.length}</span>
                    </h2>

                    {!showCompleteComment && <Comment data={comments[0]?.snippet?.topLevelComment.snippet} />}

                    {showCompleteComment && <div>
                        {comments.map((comment, index) => <Comment key={index} data={comment?.snippet?.topLevelComment.snippet} />)}
                    </div>}
                </div>
                <button onClick={hideButtonClickHandler} className={`${showCompleteComment ? "block md:hidden" : "hidden"} mx-auto text-blue-400 font-medium pt-2 pb-1 cursor-pointer`}>Hide comments</button>
            </div>
    )
}

export default Comments