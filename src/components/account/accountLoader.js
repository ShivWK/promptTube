import { auth } from "../../utils/firebaseConfig";
import { redirect } from "react-router-dom";

const accountLoader = async () => {
    await auth.authStateReady();
    const check = auth.currentUser;

    if (!check) return redirect("/") 
}

export default accountLoader;