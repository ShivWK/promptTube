import SavedVideosSection from "./SavedVideosSection";
import ProfileCard from "./ProfileCard";
import Subscriptions from "./Subscriptions";

const Account = () => {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="max-w-[1210px] md:rounded-2xl mx-auto flex flex-col md:flex-row max-md:justify-center gap-4 md:gap-2 ">
        <div className="basis-full md:basis-[25%] min-w-0 md:bg-primary/40 mx-auto w-full md:rounded-s-2xl">
          <ProfileCard />
          <Subscriptions />
        </div>
        <div className="basis-full md:basis-[74%] min-w-0">
          <SavedVideosSection />
        </div>
      </section>
    </main>
  )
}

export default Account;