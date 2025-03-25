import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Footer(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return(
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-3xl font-bold text-center">To-Do Web Application</h1>

            <button
                onClick={handleLogout}
                className="relative md:absolute mb-1 md:mb-0 top-3 right-3 items-center gap-2 text-gray-300 hover:text-white transition duration-300"
            >
                <FiLogOut className="h-6 w-6" />
            </button>
        </header>
    );
}