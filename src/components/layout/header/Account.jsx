import { CircleUserRound } from "lucide-react"

const Account = () => {
  const isSmall = window.innerWidth <= 768;

  return (
    <div className="flex items-center gap-2.5">
      <span className="dark:text-gray-200 text-2xl font-semibold tracking-wide max-md:hidden">Name</span>
      <CircleUserRound size={isSmall ? 45 : 55} className="dark:text-gray-300"/>
    </div>
  )
}

export default Account