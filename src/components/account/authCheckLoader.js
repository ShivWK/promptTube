import { auth } from "../../utils/firebaseConfig";
import { redirect } from "react-router-dom";

const authCheckLoader = async () => {
    await auth.authStateReady();
    const user = auth.currentUser;

    if (!user) {
        return redirect("/")
    } 
}

export default authCheckLoader;