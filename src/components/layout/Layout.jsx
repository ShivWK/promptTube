import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
    selectSidebar,
    setIsSmall,
    setSearchSuggestions,
} from "../../features/home/homeSlice";

import { auth } from "../../utils/firebaseConfig";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Toast from "../common/Toast";
import EmailVerification from "../common/EmailVerification";

import {
    selectOpenAuthFrom,
    setAuthDetails,
    setLoginStatus,
    selectEmailVerification
} from "../../features/authSlice";

import Form from "../auth/Form";
import { useEffect, useState } from "react";
import SecondarySideMenu from "../common/SecondarySideMenu";
import Sidebar from "../common/Sidebar";

const Layout = () => {
    const [isSmall, setSmall] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showSideMenu, setShowSideMenu] = useState(true);

    const openAuthForm = useSelector(selectOpenAuthFrom);
    const { openSidebar } = useSelector(selectSidebar);
    const { openEmailVerification } = useSelector(selectEmailVerification);

    const dispatch = useDispatch();
    const pathname = useLocation().pathname;

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 768) {
                setSmall(true);
                dispatch(setIsSmall(true));
            } else {
                setSmall(false);
                dispatch(setIsSmall(false));
            }
        }

        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [])

    useEffect(() => {
        const handleDocClick = () => dispatch(setSearchSuggestions([]))

        document.addEventListener("click", handleDocClick);
        return () => document.removeEventListener("click", handleDocClick);
    }, [])

    useEffect(() => {
        if (pathname === "/gptBrowser") setShowHeader(false);
        else setShowHeader(true);

        if (pathname === "/watch") setShowSideMenu(false);
        else setShowSideMenu(true);

    }, [pathname])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setAuthDetails({
                    name: user.displayName,
                    email: user.email,
                    emailVerification: user.emailVerified,
                    userId: user.uid,
                    accessT: user.stsTokenManager.accessToken,
                    refreshT: user.stsTokenManager.refreshToken,
                }))
                dispatch(setLoginStatus(true));
            } else {
                dispatch(setAuthDetails({
                    name: "",
                    email: "",
                    userId: null,
                    accessT: null,
                    refreshT: null,
                }))
                dispatch(setLoginStatus(false));
            }
        })

        return () => unsubscribe();
    }, [])

    return (<>
        {showHeader && <Header />}
        <Outlet context={isSmall} />
        <Footer />
        <Toast />

        {openAuthForm && <Form />}
        {showSideMenu && <SecondarySideMenu />}
        {openSidebar && <Sidebar isSmall={isSmall} />}
        {openEmailVerification && <EmailVerification isSmall={isSmall} />}
    </>)
}

export default Layout;