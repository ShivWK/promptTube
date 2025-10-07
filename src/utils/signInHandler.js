import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { setToast } from "../features/authSlice";

async function signInHandler({ email, password, dispatch, setAuthLoading }) {
    try {
        let userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials);
        setAuthLoading(false)
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
