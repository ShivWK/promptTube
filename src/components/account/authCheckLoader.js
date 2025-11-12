import { auth } from "../../utils/firebaseConfig";
import { redirect } from "react-router-dom";

const authCheckLoader = async () => {
    await auth.authStateReady();
    const check = auth.currentUser;

    if (!check) return redirect("/") 
}

export default authCheckLoader;