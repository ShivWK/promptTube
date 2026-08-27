import { useNavigate } from "react-router-dom";
import calUploadTime from "../../utils/calUploadTime";
import countViews from "../../utils/countViews";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlaying } from "../../features/watch/watchSlice";
import { addToLocalStorage } from "../../utils/handleLocalStorage";
import useAuthCheck from "../../hooks/useAuthCheck";
import { selectUserDetails } from "../../features/auth/authSlice";
import { Star, Trophy, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useAddSavedVideoMutation } from "../../features/userActivity/userActivityApiSlice";

const VideoCard = ({ object, mode = "search", flexMode = "flex-col" }) => {
    const [addVideo] = useAddSavedVideoMutation();
    const isSmartSearch = mode === "smartSearch";

    const videoId = isSmartSearch
        ? object?.videoId
        : mode === "search"
            ? object?.id?.videoId
            : object?.id;

    const [_, checkAuth] = useAuthCheck({ showToast: false });
    const { id } = useSelector(selectUserDetails);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const thumbnails = object?.snippet?.thumbnails;

    const thumbnailUrls = [
        thumbnails?.maxres?.url,
        thumbnails?.standard?.url,
        thumbnails?.high?.url,
        thumbnails?.medium?.url,
        thumbnails?.default?.url,
    ].filter(Boolean);

    const [thumbnailIndex, setThumbnailIndex] = useState(0);

    const thumbnailUrl = thumbnailUrls[thumbnailIndex];

    const handleThumbnailError = () => {
        if (thumbnailIndex < thumbnailUrls.length - 1) {
            setThumbnailIndex((prev) => prev + 1);
        }
    };

    const title = object?.snippet?.localized?.title || object?.snippet?.title;
    const channelTitle = object?.snippet?.channelTitle;
    const publishedAt = object?.snippet?.publishedAt;
    const viewCount = object?.statistics?.viewCount;

    const hasViews =
        viewCount !== undefined &&
        viewCount !== null &&
        viewCount !== "" &&
        Number.isFinite(Number(viewCount));

    const hasPublishedAt = publishedAt && !Number.isNaN(new Date(publishedAt).getTime());

    const handleLinkClick = async () => {
        if (!videoId) return;
        dispatch(setCurrentPlaying(object));

        navigate(`/watch?id=${videoId}&channelid=${object?.snippet?.channelId || ""}&categoryid=${object?.snippet?.categoryId || 1}`);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        if (checkAuth) {
            addVideo({
                videoId,
                userId: id,
                videoType: "history"
            })
        }

        addToLocalStorage({
            name: "currentPlayingVideo",
            add: object,
        });
    };

    if (!object || !videoId) {
        return null;
    }

    return (
        <div
            onClick={handleLinkClick}
            className={`basis-full sm:basis-[48%] md:basis-[30%] lg:basis-[31%] xl:basis-[32%] rounded-2xl overflow-hidden flex ${flexMode} items-center self-start bg-gray-900 transform hover:scale-[1.02]transition-all duration-150 ease-linear cursor-pointer ${isSmartSearch && "border border-gray-700"}`}
        >
            {thumbnailUrl && (
                <div className="relative w-full">
                    <img
                        src={thumbnailUrl}
                        alt={title || "Video thumbnail"}
                        onError={handleThumbnailError}
                        className="w-full object-cover self-start rounded-t-2xl aspect-video"
                    />

                    {isSmartSearch &&
                        Number.isFinite(Number(object?.rank)) && (
                            <div className=" absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-gray-950/90 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-white">
                                <Trophy size={15} className="text-yellow-400" />
                                <span>#{object.rank}</span>
                            </div>
                        )}

                    {/* AI Score */}

                    {isSmartSearch &&
                        Number.isFinite(Number(object?.score)) && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full  bg-gray-950/90 backdrop-blur-sm px-2.5 py-1.5 text-sm font-semibold text-white">
                                <Star
                                    size={15}
                                    fill="currentColor"
                                    className="text-yellow-400"
                                />
                                <span>{object.score}</span>
                            </div>
                        )}
                </div>
            )}

            <div className="p-3 dark:text-white w-full flex flex-col gap-1">
                {title && (
                    <h2 className="text-start font-medium tracking-wide line-clamp-2 leading-5 break-words">
                        {title}
                    </h2>
                )}

                {channelTitle && (
                    <p className="text-sm dark:text-gray-300 line-clamp-1">
                        {channelTitle}
                    </p>
                )}

                {(hasViews || hasPublishedAt) && (
                    <div className="text-sm flex items-center gap-1.5 dark:text-gray-300-mt-1.5">
                        {mode !== "search" && hasViews && (
                            <>
                                <span>{`${countViews(viewCount)} views`}</span>
                                {hasPublishedAt && (
                                    <span className="text-xl font-bold">·</span>
                                )}
                            </>
                        )}

                        {hasPublishedAt && (
                            <span>{calUploadTime(publishedAt)}</span>
                        )}
                    </div>
                )}

                {/* AI Information */}

                {isSmartSearch && (
                    <div
                        className="
                            mt-3
                            pt-3
                            border-t border-gray-700
                            space-y-3
                        "
                    >
                        {/* Why this video */}

                        {object?.reason && (
                            <div>
                                <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-1">
                                    Why this is recommended
                                </p>

                                <p className="text-sm text-gray-300 leading-5">
                                    {object.reason}
                                </p>
                            </div>
                        )}

                        {/* Strengths */}

                        {Array.isArray(object?.strengths) &&
                            object.strengths.length > 0 && (
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1.5">
                                        Strengths
                                    </p>

                                    <div className="space-y-1">
                                        {object.strengths
                                            .filter(Boolean)
                                            .slice(0, 3)
                                            .map((strength, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2"
                                                >
                                                    <Check
                                                        size={15}
                                                        className="text-green-400 mt-0.5 shrink-0"
                                                    />

                                                    <span className="text-sm text-gray-300">
                                                        {strength}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                        {/* Weaknesses */}

                        {Array.isArray(object?.weaknesses) &&
                            object.weaknesses.length > 0 && (
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1.5">
                                        Things to consider
                                    </p>

                                    <div className="space-y-1">
                                        {object.weaknesses
                                            .filter(Boolean)
                                            .slice(0, 2)
                                            .map((weakness, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2"
                                                >
                                                    <AlertTriangle
                                                        size={15}
                                                        className="text-yellow-400 mt-0.5 shrink-0"
                                                    />

                                                    <span className="text-sm text-gray-400">
                                                        {weakness}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCard;