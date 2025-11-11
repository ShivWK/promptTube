import SavedVideosSection from "./SavedVideosSection";
import ProfileCard from "./ProfileCard";

const Account = () => {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="max-w-[1200px] md:rounded-2xl overflow-hidden mx-auto flex flex-col md:flex-row max-md:justify-center md:items-center max-md:gap-4">
        <ProfileCard />
        <SavedVideosSection />
      </section>
    </main>
  )
}

export default Account;