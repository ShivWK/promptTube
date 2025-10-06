import { CircleUserRound, Home } from "lucide-react"

const SideMenu = () => {
  const isSmall = window.innerWidth <= 786;

  return (
    <aside className="fixed top-1/2 left-0 -translate-y-1/2 rounded-e-2xl p-2 lg:p-2 flex flex-col dark:bg-gray-900">
      <div className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-3 lg:px-4 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <Home size={isSmall ? 25 : 40} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 select-none">Home</span>
      </div>

      <div className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-3 lg:px-4 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <CircleUserRound size={isSmall ? 25 : 40} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 select-none">You</span>
      </div>
    </aside>
  )
}

export default SideMenu;