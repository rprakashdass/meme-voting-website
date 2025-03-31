import { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "../../../config/api";
import Loading from "../../util/Loading";

type Owner = {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
}

const ViewMemeOwners = () => {
    const [owners, setOwners] = useState<Owner[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/owners/all`)
            .then(res => {
                setOwners(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching meme owners:", err);
                setError("Failed to load meme owners");
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading/>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold text-center mb-5">Meme Owners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {owners.length > 0 ? owners.map((owner: Owner) => (
                    <div key={owner._id} className="border rounded-lg p-4 shadow-lg bg-white">
                        <h3 className="font-bold text-lg">{owner.name || "No Name"}</h3>
                        <p className="text-gray-600">📧 {owner.email}</p>
                        <p className="text-gray-600">📞 {owner.phoneNumber || "No Phone Number"}</p>
                    </div>
                )) : (
                    <p className="text-center col-span-3 text-gray-500">No meme owners found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewMemeOwners;