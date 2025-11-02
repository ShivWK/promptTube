import { Brain } from "lucide-react"

const SummaryAndQA = () => {
    return (
        <div className="rounded-4xl flex gap-1 lg:gap-1.5 items-center py-1 lg:py-1.5 px-4 lg:px-5 bg-gradient-to-r from-primary via-blue-500 to-green-400 font-semibold cursor-pointer transform active:scale-[0.95] transition-all duration-75 ease-linear w-fit mx-auto md:text-lg my-1">
            <span className='dark:text-white tracking-wide select-none'>Summary and Q&A</span>
            <Brain className='dark:text-white' />
        </div>
    )
}

export default SummaryAndQA

