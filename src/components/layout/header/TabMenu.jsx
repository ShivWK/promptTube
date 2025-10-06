import { TABS } from "../../../utils/constants"

const TabMenu = () => {
  return (
    <div className="flex items-center gap-4 backdrop-blur-md pt-3 lg:py-4 overflow-auto">
      {
        TABS.map((item, index) => {
          return <span className="rounded-md lg:rounded-xl py-1 lg:py-2 px-3 lg:px-4 dark:bg-gray-400/30 dark:text-white lg:text-xl font-semibold cursor-pointer whitespace-nowrap" key={index}>
            {item}
          </span>
        }) 
      }
    </div>
  )
}

export default TabMenu