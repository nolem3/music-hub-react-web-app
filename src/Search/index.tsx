import { useLocation } from "react-router-dom";

export default function Search() {

    const { pathname } = useLocation();

    return (
        <div>
            Showing results for {pathname.split("Search/")[1] || "Nothing"}
        </div>
    )
}