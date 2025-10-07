import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { selectOpenAuthFrom } from "../../features/authSlice";
import Form from "../auth/Form";

const Layout = () => {
    const openAuthForm = useSelector(selectOpenAuthFrom);

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