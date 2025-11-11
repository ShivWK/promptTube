import SavedVideosSection from "./SavedVideosSection";
import ProfileCard from "./ProfileCard";

const Account = () => {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="max-w-[1200px] md:rounded-2xl  mx-auto flex flex-col md:flex-row max-md:justify-center max-md:gap-4">
        <div className="basis-full md:basis-[30%]">
          <ProfileCard />
        </div>
        <div className="basis-full md:basis-[70%]">
          <SavedVideosSection />
        </div>
      </section>
    </main>
  )
}

export default Account;