export default function Button({ ref, clickHandler, iconClass }) {
    console.log("Called button")

    return <button
        ref={ref}
        onClick={clickHandler}
        className="group cursor-pointer transform active:scale-95 transition-all duration-100 ease-linear"
    >
        <i className={`ri-arrow-${iconClass}-circle-fill text-[40px] text-primary group-disabled:text-gray-400 group-active:text-primary transition-all duration-75 ease-in`}></i>
    </button>
}