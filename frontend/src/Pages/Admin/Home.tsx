import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SERVER_URL from "../../../config/api";
import axios from "axios";

const navItems = [
    {
        title: 'View Users',
        link: '/admin/view-users'
    },
    {
        title: 'Add Meme Owners',
        link: '/admin/add-meme-owners'
    },
    {
        title: 'View Meme Owners',
        link: '/admin/view-meme-owners'
    },
    {
        title: 'Upload Memes',
        link: '/admin/upload-memes'
    },
];

const AdminHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            navigate("/");
            return;
        }

        axios.post(`${SERVER_URL}/users/is-admin`, { email: userEmail })
            .then((res) => {
                if (!res.data.isAdmin) {
                    navigate("/memes");
                }
            })
            .catch((error) => {
                console.error("Error checking admin role:", error);
                navigate("/");
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    return (
        <div className="p-5">
            {/* Admin Navbar */}
            <nav className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg mb-5">
                <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                    <span className="text-lg font-semibold">Admin Dashboard</span>
                    <div className="flex flex-row gap-2">
                    <button
                        className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
                        onClick={()=>{navigate("/")}}
                    >
                        View as User
                    </button>
                    <button
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    </div>
                </div>
            </nav>

            {/* Admin Dashboard Cards */}
            <div className="flex flex-wrap justify-center gap-6">
                {navItems.map((item, id) => (
                    <a href={item.link} key={id} className="block w-56 p-5 text-center border border-blue-600 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition">
                        <h1 className="text-lg font-bold">{item.title}</h1>
                        <button className="mt-3 bg-blue-500 px-3 py-2 rounded-md text-white">Click Here</button>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;