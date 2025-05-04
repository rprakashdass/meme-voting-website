import { useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../../config/api';
import Loading from '../../util/Loading';

type MemeType = {
    _id: string;
    memeOwner: string | null;
    image: string;
    votes: number;
    voters: string[]; // Array of user emails or IDs who voted
};

type MemeOwnerType = {
    name: string | null;
    email: string | null;
};

const ViewMemes = () => {
    const [memes, setMemes] = useState<MemeType[]>([]);
    const [owners, setOwners] = useState<Record<string, MemeOwnerType>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch all memes
        axios.get(`${SERVER_URL}/memes/all`)
            .then(async (res) => {
                const memesData = res.data;
                setMemes(memesData);

                // Fetch owner details for each meme
                const ownerPromises = memesData.map((meme: MemeType) =>
                    meme.memeOwner
                        ? axios.get(`${SERVER_URL}/owners/${meme.memeOwner}`)
                        : Promise.resolve(null)
                );

                const ownerResponses = await Promise.all(ownerPromises);
                const ownersMap: Record<string, MemeOwnerType> = {};

                ownerResponses.forEach((response, index) => {
                    if (response && response.data) {
                        ownersMap[memesData[index].memeOwner!] = response.data;
                    }
                });

                setOwners(ownersMap);
            })
            .catch(err => {
                setError("Failed to fetch memes");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id: string) => {
        if (!window.confirm("Are you sure you want to delete this meme?")) return;

        axios.delete(`${SERVER_URL}/memes/delete/${id}`)
            .then(() => {
                setMemes(memes.filter(meme => meme._id !== id));
                alert("Meme deleted successfully!");
            })
            .catch(err => {
                console.error(err);
                alert("Failed to delete meme.");
            });
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-center text-red-500 p-5">{error}</div>;

    return (
        <div className="m-5">
            <h2 className="text-xl font-bold mb-4">Uploaded Memes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {memes.length > 0 ? (
                    memes.map((meme) => {
                        const owner = owners[meme.memeOwner || ""] || { name: "Unknown", email: "Unknown" };
                        return (
                            <div key={meme._id} className="border border-blue-500 rounded-lg p-4 shadow-md">
                                <img
                                    src={meme.image}
                                    alt="Meme"
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                />
                                <h3 className="font-semibold">Meme Creator Name: {owner.name || "Unknown"} </h3>
                                <p className="text-gray-700">Email: {owner.email}</p>
                                <p className="text-gray-700">Votes: {meme.votes}</p>
                                <p className="text-gray-700">Voters:</p>
                                <ul className="list-disc list-inside text-gray-600">
                                    {meme.voters.length > 0 ? (
                                        meme.voters.map((voter, index) => (
                                            <li key={index}>{voter}</li>
                                        ))
                                    ) : (
                                        <li>No voters yet</li>
                                    )}
                                </ul>
                                <button
                                    onClick={() => handleDelete(meme._id)}
                                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete Meme
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No memes found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewMemes;