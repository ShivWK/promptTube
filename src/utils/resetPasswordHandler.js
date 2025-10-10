import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { setToast } from "../features/authSlice";

const resetPasswordHandler = async ({ setResetPasswordLoading, setResetPasswordMailSend, email, dispatch, resetPasswordMailSend }) => {
    if (resetPasswordMailSend) return;
    setResetPasswordLoading(true);
    try {
        await sendPasswordResetEmail(auth, email);
        setResetPasswordMailSend(true);
        setResetPasswordLoading(false);
    } catch (err) {
        console.log(err);
        console.log(err.code);
        console.lof(err.message);

        dispatch(setToast({
            error: true,
            show: true,
            message: ""
        }))

        setResetPasswordLoading(false);
    }
}

export default resetPasswordHandler;