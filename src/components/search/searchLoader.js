import { redirect } from "react-router-dom";

function searchLoader() {
    if (window.innerWidth > 768) {
        return redirect("/")
    }

    return null;
}

export default searchLoader;