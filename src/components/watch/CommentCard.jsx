import { useEffect, useRef, useState } from "react";
import calUploadTime from "../../utils/calUploadTime";

const Comment = ({ data }) => {
    const [showMore, setShowMore] = useState(false);
    const [ overflowing, setOverFlowing ] = useState(false);
    const [ errorInImage, setErrorInImage ] = useState(false);
    const commentPara = useRef(null);

    useEffect(() => {
        if (commentPara.current) {
            const ele = commentPara.current;
            if (ele.scrollHeight > ele.clientHeight) setOverFlowing(true);
        }
    }, [])

    return (
        <div className="mt-2 flex gap-2 md:gap-3 p-1 my-2.5 w-full">
            <img src={(errorInImage || data?.authorProfileImageUrl === "") ? "/images/profile-icon.png" : data?.authorProfileImageUrl} alt="commenter_profile" className="rounded-full h-9 w-9 md:h-11 md:w-11 self-start" onError={() => setErrorInImage(true)} />

            <div className={`flex flex-col`}>
                <div className="flex gap-1 md:gap-1.5 items-center text-xs tracking-wide text-gray-300">
                    <p>{data?.authorDisplayName}</p>
                    <span className="text-xl font-bold">·</span>
                    <p>{calUploadTime(data?.publishedAt)}</p>
                </div>

                <p ref={commentPara} className={`text-sm leading-4.5 w-full truncate whitespace-normal break-all ${showMore ? "max-h-auto" : "max-h-9"} `} dangerouslySetInnerHTML={{ __html: data?.textDisplay }}></p>

                {overflowing && <button onClick={() => setShowMore(!showMore)} className="text-xs tracking-wide text-blue-400 cursor-pointer self-start">{
                    showMore ? "show less" : "show more"
                }</button>}
            </div>
        </div>
    )
}

export default Comment;