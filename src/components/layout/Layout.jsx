import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useLazyGetPopularVideosQuery } from "../../features/home/homeApiSlice";
import { setHomeLoading, setHomeVideos, selectSidebar } from "../../features/home/homeSlice";
import { auth } from "../../utils/firebaseConfig";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Toast from "../common/Toast";

import {
    selectOpenAuthFrom,
    setAuthDetails,
    setLoginStatus,
    selectToast
} from "../../features/authSlice";

import Form from "../auth/Form";
import { useEffect, useState } from "react";
import SecondarySideMenu from "./header/SecondarySideMenu";
import Sidebar from "../common/Sidebar";

const Layout = () => {
    const [isSmall, setSmall] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showSideMenu, setShowSideMenu] = useState(true);
    const [trigger] = useLazyGetPopularVideosQuery();

    const openAuthForm = useSelector(selectOpenAuthFrom);
    const { openSidebar } = useSelector(selectSidebar)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 768) {
                setSmall(true);
            } else {
                setSmall(false);
            }
        }

        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [])

    useEffect(() => {
        if (pathname === "/gptBrowser") setShowHeader(false);
        else setShowHeader(true);
    }, [pathname])

    useEffect(() => {
        const popularVideosCall = async () => {
            try {
                const { items } = await trigger().unwrap();
                dispatch(setHomeVideos(items));
                dispatch(setHomeLoading(false));

                console.log(items);
            } catch (err) {
                console.log(err);
            }
        }

        popularVideosCall();
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                dispatch(setAuthDetails({
                    name: user.displayName,
                    email: user.email,
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

            navigate("/");
        })

        return () => unsubscribe();
    }, [])

    return (<>
        {showHeader && <Header />}
        <Outlet context={isSmall} />
        <Footer />

        {openAuthForm && <Form />}
        <Toast />
        {showSideMenu && <SecondarySideMenu />}
        {openSidebar && <Sidebar isSmall={isSmall}/>}
    </>)
}

export default Layout;