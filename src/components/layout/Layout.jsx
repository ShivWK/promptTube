import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
    selectSidebar,
    setIsSmall,
    setSearchSuggestions,
    setHomeVideos
} from "../../features/home/homeSlice";

import { useLazyGetPopularVideosQuery } from "../../features/home/homeApiSlice";
import {
    useLazyGetSavedVideosQuery,
    useLazyGetCommentsQuery,
    useLazyGetSubscriptionsQuery
} from "../../features/userActivity/userActivityApiSlice";
import { setCurrentPlaying } from "../../features/watch/watchSlice";

import { auth } from "../../utils/firebaseConfig";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Toast from "../common/Toast";
import EmailVerification from "../common/EmailVerification";

import {
    selectOpenAuthFrom,
    setAuthDetails,
    setLoginStatus,
    selectEmailVerification,
    selectUserDetails
} from "../../features/auth/authSlice";

import Form from "../auth/Form";
import { useEffect, useState } from "react";
import SecondarySideMenu from "../common/SecondarySideMenu";
import Sidebar from "../common/Sidebar";
import { getFromLocalStorage } from "../../utils/handleLocalStorage";
import BackToTopButton from "../common/BackToTopBtn";

const Layout = () => {
    const [trigger] = useLazyGetPopularVideosQuery();
    const [triggerVideos] = useLazyGetSavedVideosQuery();
    const [triggerSubscriptions] = useLazyGetSubscriptionsQuery();
    const [triggerComments] = useLazyGetCommentsQuery();
    const [isSmall, setSmall] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showSideMenu, setShowSideMenu] = useState(true);
    const [showTopBtn, setShowTopBtn] = useState(true);

    const openAuthForm = useSelector(selectOpenAuthFrom);
    const { openSidebar } = useSelector(selectSidebar);
    const { openEmailVerification } = useSelector(selectEmailVerification);
    const { id } = useSelector(selectUserDetails);

    const dispatch = useDispatch();
    const pathname = useLocation().pathname;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const [ videos, subscriptions, comments ] = await Promise.all([
                    triggerVideos({ userId: id }).unwrap(),
                    triggerSubscriptions({ userId: id }).unwrap(),
                    triggerComments({ userId: id }).unwrap(),
                ])

                // console.log(respons);
            }
        }

        fetchData();
    }, [id])

    useEffect(() => {
        let value = [];
        dispatch(setHomeVideos({
            value,
            loading: true
        }))

        const popularVideosCall = async () => {
            try {
                const { items } = await trigger().unwrap();
                value = items;
            } catch (err) {
                console.log(err);
            } finally {
                dispatch(setHomeVideos({
                    value,
                    loading: false,
                }))
            }
        }
        popularVideosCall();
    }, [])

    useEffect(() => {
        const currentPlaying = getFromLocalStorage({ get: "currentPlayingVideo" });
        dispatch(setCurrentPlaying(currentPlaying ?? []));

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

        const handleDocClick = () => dispatch(setSearchSuggestions([]))

        document.addEventListener("click", handleDocClick);
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
            document.removeEventListener("click", handleDocClick)
        };
    }, [])

    useEffect(() => {
        if (pathname === "/gptBrowser") setShowHeader(false);
        else setShowHeader(true);

        if (pathname === "/watch") setShowSideMenu(false);
        else setShowSideMenu(true);

        if (pathname === "/watch" || pathname === "/" || pathname === "/memory") setShowTopBtn(true);
        else setShowTopBtn(false);
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
        {showTopBtn && <BackToTopButton />}
    </>)
}

export default Layout;