const Attribution = () => {
    return (
        <div className="text-gray-800 w-fit max-md:mb-3">
            <p className="mb-2 text-lg dark:text-white font-medium tracking-wide">Developed By</p>
            <div className="flex gap-2.5 w-fit">
                <img
                    onClick={() => {
                        dispatch(setDpModelHide(false))
                        dispatch(setDpModelOpen(true))
                    }}

                    className="h-[14vh] w-[14vh] rounded-[50%] object-cover border-2 border-primary p-1"
                    src="/images/MY-min.png"
                    alt="Developer image"
                />
                <div className="flex flex-col justify-center italic dark:text-white">
                    <p className="text-lg tracking-wide">Shivendra Dwivedi</p>
                    <p className="flex items-center gap-2 text-sm">
                        <span>Web Developer</span>
                        <span className="text-gray-800 lg:hidden dark:text-gray-300">•</span>
                        <a
                            href="https://portfolio.shivendra.site"
                            target="__blank"
                            className="lg:hidden text-primary text-sm tracking-wider underline underline-offset-2">
                            Portfolio
                        </a>
                    </p>
                    <a
                        href="https://portfolio.shivendra.site"
                        target="__blank"
                        className="hidden lg:inline text-primary text-sm tracking-wider underline underline-offset-2">
                        Portfolio
                    </a>
                    <div className="max-md:flex gap-3 mt-2 hidden">
                        <a
                            href="https://www.linkedin.com/in/shivendra-dwivedi"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i
                                className="fa-brands fa-linkedin text-xl text-[#0077b5] dark:text-[rgb(41,140,240)]"
                            ></i>
                        </a>
                        <a
                            href="https://github.com/ShivWK"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i className="fa-brands fa-square-github text-xl dark:text-gray-300"></i>
                        </a>
                        <a
                            href="https://x.com/Shivendrawk"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i className="fa-brands fa-square-x-twitter text-xl dark:text-gray-300"></i>
                        </a>
                        <a
                            href="https://instagram.com/shivendrawk"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i
                                className="fa-brands fa-instagram text-xl"
                                style={{ color: "#e1306c" }}
                            ></i>
                        </a>
                        <a
                            href="mailto:shivendrawk@gmail.com"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                        >
                            <i
                                className="fa-solid fa-envelope text-xl"
                                style={{ color: "#d93025" }}
                            ></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-2 w-full mt-7">
                <p className="dark:text-white">Social Links</p>
                <div className="flex gap-3">
                    <a
                        href="https://www.linkedin.com/in/shivendra-dwivedi"
                        className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                        target="__block"
                    >
                        <i
                            className="fa-brands fa-linkedin text-2xl text-[#0077b5] dark:text-[rgb(41,140,240)]"
                        ></i>
                    </a>
                    <a
                        href="https://github.com/ShivWK"
                        className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                        target="__block"
                    >
                        <i className="fa-brands fa-square-github text-2xl dark:text-gray-300"></i>
                    </a>
                    <a
                        href="https://x.com/Shivendrawk"
                        className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                        target="__block"
                    >
                        <i className="fa-brands fa-square-x-twitter text-2xl dark:text-gray-300"></i>
                    </a>
                    <a
                        href="https://instagram.com/shivendrawk"
                        className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                        target="__block"
                    >
                        <i
                            className="fa-brands fa-instagram text-2xl"
                            style={{ color: "#e1306c" }}
                        ></i>
                    </a>
                    <a
                        href="mailto:shivendra@shivendra.site"
                        className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                    >
                        <i className="fa-solid fa-envelope text-2xl text-[#d93025]"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Attribution;