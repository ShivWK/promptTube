import { selectHomeVideos, selectHomeLoading } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const loading = useSelector(selectHomeLoading);
  const videos = useSelector(selectHomeVideos);

  return (
    <main className="pt-32 lg:pt-40 md:pl-28 p-2 md:p-3">
      {/* <p className="text-white border-2 border-white">HI buddy</p> */}
      <section>
        <div>
          <div>
            
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home;