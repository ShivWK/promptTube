import { CircleUserRound, CircleCheck, Info, LogOut } from "lucide-react";
import { selectUserDetails, setEmailVerification } from "../../features/auth/authSlice";
import { selectHistory, selectLikedVideos, selectWatchLater } from "../../features/watch/watchSlice";
import { selectSubscriptions } from "../../features/userActivity/userActivitySlice";
import { useLazyGetVideoByIdQuery, useLazyGetChannelDetailsQuery } from "../../features/watch/watchApiSlice";
import { selectIsSmall, selectSavedDataLoading } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import ChannelCard from "../common/ChannelCard";

const Account = () => {
  const [triggerVideos] = useLazyGetVideoByIdQuery();
  const [triggerChannelDetails] = useLazyGetChannelDetailsQuery();
  const { name, email, isEmailVerified, id } = useSelector(selectUserDetails);
  const historyVideoIds = useSelector(selectHistory);
  const likedVideoIds = useSelector(selectLikedVideos);
  const watchLaterVideoIds = useSelector(selectWatchLater);
  const subscriptions = useSelector(selectSubscriptions);
  const isSmall = useSelector(selectIsSmall);
  const savedDataLoading = useSelector(selectSavedDataLoading);

  const [isLoading, setLoading] = useState(false)
  const [videosLoading, setVideosLoading] = useState(true);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const dispatch = useDispatch()

  let historyVideos = null;
  let watchLaterVideos = null;
  let likedVideos = null;
  let channels = null;

  console.log(videosLoading)

  useEffect(() => {
    const fetchData = async () => {
      if (savedDataLoading) return;

      [historyVideos, watchLaterVideos, likedVideos, channels] = await Promise.all([
        triggerVideos({ id: historyVideoIds.join(",") }),
        triggerVideos({ id: watchLaterVideoIds.join(",") }),
        triggerVideos({ id: likedVideoIds.join(",") }),
        triggerChannelDetails({ id: subscriptions.join(",") })
      ])
      setSubscribedChannels(channels.data.items)
      setVideosLoading(false);

      // console.log("History", historyVideos.data.items, "Like", likedVideos.data.items, "watch", watchLaterVideos.data.items)

      console.log("Subscription", channels.data.items);
    }

    fetchData()
  }, [likedVideoIds, historyVideoIds, watchLaterVideoIds, savedDataLoading])

  const verifyEmailHandler = () => {
    dispatch(setEmailVerification({
      mode: "All",
      value: true,
    }))
  }

  const signoutClickHandler = (e) => {
    e.stopPropagation()
    if (isLoading) return;

    const signout = async () => {
      setLoading(true);
      try {
        await signOut(auth);
        setLoading(false)
      } catch (err) {
        setLoading(false);
        dispatch(setToast({
          message: "Unable to sign out. Please ty again!",
          show: true,
          error: true,
        }))
      }
    }
    signout()
  }

  return (
    <main className="pt-20 lg:pt-24">
      <section className="max-w-[1200px] md:rounded-2xl overflow-hidden mx-auto flex flex-col md:flex-row max-md:justify-center md:items-center max-md:gap-4">
        <div className="flex flex-col gap-2 max-md:rounded-2xl items-center text-white bg-primary/40 p-4 px-8 w-[80%] md:w-fit text-xl max-md:mx-auto md:basis-[35%]">
          <CircleUserRound strokeWidth={0.5} className="h-26 w-26 rounded-full" />
          <p>{name}</p>
          <div className="flex items-center gap-1">
            {isEmailVerified
              ? <CircleCheck size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-green-400" />
              : <Info onClick={verifyEmailHandler} size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-red-500 cursor-pointer transform active:scale-95 transition-all duration-100 ease-linear" />
            }
            <p className="truncate leading-5">{email}</p>
          </div>
          <button onClick={signoutClickHandler} className={`flex items-center justify-center gap-2 mt-4 dark:text-white w-full bg-primary p-1 rounded-md cursor-pointer transform transition-all duration-150 ease-linear ${!isLoading && "active:scale-95 hover:bg-[#c2072d]"}`}>
            {
              isLoading
                ? <DotBounceLoader />
                : <div className="flex items-center gap-2 font-medium w-fit">
                  <LogOut />
                  <p>Sign out</p>
                </div>
            }
          </button>

          <div className="self-start mt-1 w-full">
            <h2 className="text-lg font-medium tracking-wider my-2">Subscriptions</h2>
            <div className="flex flex-col gap-2 h-80 overflow-y-auto overflow-x-hidden pretty-scrollbar pb-2">
              {
                (videosLoading || savedDataLoading ) ? <p>Loading...</p>
                  : subscribedChannels.map((channel) => <ChannelCard channel={channel} />)
              }
            </div>
          </div>
        </div>

        <div className="w-full border border-yellow-50 self-start p-4 text-white">
          <h2 className="text-xl tracking-wide">History</h2>
          <div>

          </div>

          <h2 className="text-xl tracking-wide">Liked videos</h2>
          <div></div>

          <h2 className="text-xl tracking-wide">Watch later</h2>
          <div></div>
        </div>
      </section>
    </main>
  )
}

export default Account;