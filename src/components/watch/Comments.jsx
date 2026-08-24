import { useLazyGetCommentsQuery } from "../../features/watch/watchApiSlice";
import { selectIsSmall } from "../../features/home/homeSlice";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";
import Comment from "./CommentCard";
import useFetch from "../../hooks/useFetch";
import { selectUserDetails } from "../../features/auth/authSlice";
import useAuthCheck from "../../hooks/useAuthCheck";
import CommentShimmer from "../shimmer/CommentShimmer";
import { auth } from "../../utils/firebaseConfig";

import {
    useGetCommentsQuery,
    useAddCommentMutation,
} from "../../features/userActivity/userActivityApiSlice";

const Comments = ({ id }) => {
    const { name, id: userId } = useSelector(selectUserDetails);

    const isSmall = useSelector(selectIsSmall);

    const [trigger, { isLoading }] = useLazyGetCommentsQuery();

    const [videoComments, setVideoComments] = useState([]);

    const [showCompleteComment, setShowCompleteComment] = useState(false);

    const [_, checkAuth] = useAuthCheck();

    const currentPhotoURL = auth.currentUser?.photoURL;

    const [addComment, { isLoading: isAddingComment }] =
        useAddCommentMutation();

    const {
        data: userCommentData,
        isLoading: userCommentsLoading,
    } = useGetCommentsQuery(
        { userId },
        {
            skip: !userId,
        }
    );

    const userComments = userCommentData?.data
        ?.filter((item) => item.videoId === id)
        ?.flatMap((item) => item.comment || []) || [];

    useFetch({
        trigger,
        setState: setVideoComments,
        fetchWhat: "Comments",
        id,
    });

    const comments = [...userComments, ...videoComments];

    useEffect(() => {
        if (!isSmall) {
            setShowCompleteComment(true);
        }
    }, [isSmall]);

    const hideButtonClickHandler = (e) => {
        e.stopPropagation();
        setShowCompleteComment(false);
    };

    const commentBoxClickHandler = () => {
        if (isSmall) {
            setShowCompleteComment(true);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const check = checkAuth();

        if (!check) return;

        const message = e.target.comment.value.trim();

        if (!message) return;

        const idRandom = Math.floor(Math.random() * 100000 + 1);

        const comment = {
            idRandom,
            snippet: {
                topLevelComment: {
                    snippet: {
                        authorProfileImageUrl: currentPhotoURL || "",
                        authorDisplayName: `@${name
                            ?.split(" ")
                            .join("")
                            .toLowerCase()}`,
                        publishedAt: new Date().toISOString(),
                        textDisplay: message,
                        deletable: true,
                    },
                },
            },
        };

        e.target.comment.value = "";

        addComment({
            userId,
            videoId: id,
            comment,
        });
    };

    const commentsLoading = isLoading || userCommentsLoading;

    if (commentsLoading) {
        return <CommentShimmer />;
    }

    return (
        <div
            onClick={commentBoxClickHandler}
            className={`relative w-full rounded-md transition-all duration-150 ease-linear
                dark:bg-gray-800 p-2 pb-1 dark:text-gray-200 mt-1 pretty-scrollbar
                ${showCompleteComment
                    ? "overflow-auto"
                    : "overflow-hidden cursor-pointer"
                }`}
        >
            {/* Comment input */}
            {showCompleteComment && (
                <div className="flex items-center gap-2 md:gap-3 mb-2 bg-gray-800 w-full">
                    {currentPhotoURL ? (
                        <img
                            src={currentPhotoURL}
                            alt="Profile"
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                        />
                    ) : (
                        <CircleUserRound
                            size={55}
                            strokeWidth={1}
                            className="dark:text-primary"
                        />
                    )}

                    <form
                        onSubmit={submitHandler}
                        className="bg-gray-900 w-full mx-auto flex items-center justify-between rounded-4xl overflow-hidden border border-primary"
                    >
                        <input
                            name="comment"
                            autoComplete="off"
                            disabled={isAddingComment}
                            className="outline-none border-none w-full py-1 md:py-1.5 pl-3 pr-1.5"
                            placeholder="type your comment..."
                        />

                        <button
                            type="submit"
                            disabled={isAddingComment}
                            className="bg-primary self-stretch flex items-center justify-center cursor-pointer active:scale-95 transform transition-all duration-150 ease-linear disabled:opacity-50"
                        >
                            <i className="ri-send-plane-2-fill px-2 md:px-3 text-2xl" />
                        </button>
                    </form>
                </div>
            )}

            {/* Comments */}
            <div
                className={`${showCompleteComment
                    ? "max-md:max-h-[25rem] md:h-auto overflow-auto"
                    : ""
                    } pretty-scrollbar`}
            >
                <h2 className="text-sm md:text-sm">
                    <span className="font-medium">Comments</span>{" "}
                    <span className="text-gray-400">
                        {comments.length}
                    </span>
                </h2>

                {!showCompleteComment && comments.length > 0 && (
                    <Comment data={comments[0]?.snippet?.topLevelComment?.snippet} />
                )}

                {showCompleteComment && (
                    <div>
                        {comments.map((comment, index) => (
                            <Comment
                                key={
                                    comment.idRandom ||
                                    comment.id ||
                                    index
                                }
                                data={
                                    comment?.snippet?.topLevelComment?.snippet
                                }
                            />
                        ))}
                    </div>
                )}

                {comments.length === 0 && (
                    <p className="text-sm text-gray-400 py-3">
                        No comments yet.
                    </p>
                )}
            </div>

            <button
                onClick={hideButtonClickHandler}
                className={`${showCompleteComment
                    ? "block md:hidden"
                    : "hidden"
                    } mx-auto text-blue-400 font-medium pt-2 pb-1 cursor-pointer`}
            >
                Hide comments
            </button>
        </div>
    );
};

export default Comments;