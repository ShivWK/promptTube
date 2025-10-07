import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { selectOpenAuthFrom, setAuthDetails, setLoginStatus } from "../../features/authSlice";
import Form from "../auth/Form";
import { useEffect } from "react";

const Layout = () => {
    const openAuthForm = useSelector(selectOpenAuthFrom);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        {
            openAuthForm && <Form />
        }
        <Header />
        <Outlet />
        <Footer />
    </>)
}

export default Layout;