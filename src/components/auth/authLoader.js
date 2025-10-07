import { redirect } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";

async function authLoader() {
    await auth.authStateReady();
    const user = auth.currentUser;

    if (user) {
        return redirect("/")
    }

    return null;
}

export default authLoader;