import SavedVideosSection from "./SavedVideosSection";
import ProfileCard from "./ProfileCard";

const Account = () => {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="max-w-[1210px] md:rounded-2xl mx-auto flex flex-col md:flex-row max-md:justify-center max-md:gap-4 ">
        <div className="basis-full md:basis-[25%] min-w-0 bg-primary/40 w-[80%] md:w-full mx-auto max-md:rounded-2xl md:rounded-s-2xl">
          <ProfileCard />
        </div>
        <div className="basis-full md:basis-[74%] min-w-0">
          <SavedVideosSection />
        </div>
      </section>
    </main>
  )
}

export default Account;