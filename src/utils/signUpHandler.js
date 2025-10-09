import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { setToast, setOpenAuthForm } from "../features/authSlice";

async function signUpHandler({ email, password, dispatch, name, setAuthLoading }) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser, {
            displayName: name
        })

        dispatch(setOpenAuthForm({
            mode: "slide",
            value: false
        }))
        setAuthLoading(false)
    } catch (err) {
        let errMsg = "";

        if (err.code === "auth/email-already-in-use") {
            errMsg = "Email already taken. Please sign in."
        }

        dispatch(setToast({
            message: errMsg,
            error: true,
            show: true,
        }))
        console.log("Failed code", err.code, "message", err.message);
        setAuthLoading(false)
    }
}

export default signUpHandler;