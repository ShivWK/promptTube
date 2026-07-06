import SavedVideosSection from "./SavedVideosSection";
import { useSearchParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Subscriptions from "./Subscriptions";
import { useEffect } from "react";

const Account = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  const scrollToRequiredSection = (section) => {
    document.getElementById(section).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  useEffect(() => {
    if (section === "history") {
      scrollToRequiredSection("history")
    } else if (section === "watchLater") {
      scrollToRequiredSection("watchLater")
    } else if (section === "likedVideos") {
      scrollToRequiredSection("likedVideos")
    } else if (section === 'subscription') {
      scrollToRequiredSection("subscriptions")
    }
  }, [section])

  return (
    <main className="pt-20 lg:pt-20 py-2 h-[100vh]">
      <section className="max-w-[1210px] md:rounded-2xl mx-auto flex flex-col md:flex-row max-md:justify-center gap-4 md:gap-1 h-full">
        <div className="basis-full h-full md:basis-[22%] min-w-0 md:bg-primary/40 mx-auto md:rounded-s-2xl w-full">
          <ProfileCard />
          <Subscriptions />
        </div>
        <div className="basis-full md:basis-[77%] min-w-0">
          <SavedVideosSection />
        </div>
      </section>
    </main>
  )
}

export default Account;