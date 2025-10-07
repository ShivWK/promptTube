import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useLazyGetPopularVideosQuery } from "../../features/home/homeApiSlice";
import { setHomeLoading, setHomeVideos } from "../../features/home/homeSlice";
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
import { useEffect } from "react";

const Layout = () => {
    const [trigger] = useLazyGetPopularVideosQuery();
    const openAuthForm = useSelector(selectOpenAuthFrom);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const popularVideosCall = async () => {
            try {
                const { items } = await trigger().unwrap();
                dispatch(setHomeVideos(items));
                dispatch(setHomeLoading(false));
                
                console.log( items );
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
        {openAuthForm && <Form />}
        <Toast />
        <Header />
        <Outlet />
        <Footer />
    </>)
}

export default Layout;