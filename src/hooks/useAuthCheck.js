import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebaseConfig";
import { setToast } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const useAuthCheck = ({ showToast = true } = {}) => {
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();

    const checkAuth = () => {
        if (!user) {
            if (showToast) {
                dispatch(setToast({
                    message: "You need to log in to use this feature.",
                    error: true,
                    show: true
                }))
            }
            return false;
        } else {
            return true;
        }
    }

    return [user, checkAuth];
}

export default useAuthCheck;