import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { setToast } from "../features/authSlice";

async function signUpHandler({ email, password, dispatch, setAuthLoading }) {
    try {
        let userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredentials.user);
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