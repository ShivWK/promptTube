import { useLocation } from "react-router-dom"
import SubFooter from "./SubFooter"

const Footer = () => {
  const pathName = useLocation().pathname;

  return (
    <footer className="py-1 px-2 md:py-4 backdrop-blur-2xl left-0 bottom-0 w-full bg-black/40">
      <SubFooter />
    </footer>
  )
}

export default Footer