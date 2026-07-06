import SavedVideosSection from "./SavedVideosSection";
import { useSearchParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Subscriptions from "./Subscriptions";
import { useEffect } from "react";

const Account = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  const scrollToRequiredSection = (section) => {
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (section === "history") {
      scrollToRequiredSection("history");
    } else if (section === "watchLater") {
      scrollToRequiredSection("watchLater");
    } else if (section === "likedVideos") {
      scrollToRequiredSection("likedVideos");
    } else if (section === "subscription") {
      scrollToRequiredSection("subscriptions");
    }
  }, [section]);

  return (
    <main className="pt-20 pb-12 md:pb-2 min-h-screen">
      <section className="mx-auto md:min-h-[calc(100vh-6rem)] flex max-w-[1210px] flex-col gap-4 md:flex-row md:items-stretch md:gap-1 md:rounded-2xl">
        <div className="basis-full md:basis-[22%] min-w-0 w-full md:rounded-s-2xl md:bg-primary/40">
          <ProfileCard />
          <Subscriptions />
        </div>

        <div className="basis-full md:basis-[77%] min-w-0">
          <SavedVideosSection />
        </div>
      </section>
    </main>
  );
};

export default Account;