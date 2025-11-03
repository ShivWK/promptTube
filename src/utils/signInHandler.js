import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { setToast, setOpenAuthForm } from "../features/auth/authSlice";

async function signInHandler({ email, password, dispatch, setAuthLoading, navigate }) {
    try {
        let userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials);
        dispatch(setOpenAuthForm({
            mode: "slide",
            value: false
        }))
        setAuthLoading(false);
        navigate("/")
    } catch (err) {
        dispatch(setToast({
            show: true,
            error: true,
            message: "Invalid credentials. Try again or sign up."
        }))

        setAuthLoading(false)
    }
}

export default signInHandler;
