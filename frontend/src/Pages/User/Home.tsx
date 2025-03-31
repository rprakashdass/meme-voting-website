import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../../../config/api";

interface Meme {
    _id: string;
    image: string;
    votes: number;
}

const MemeContainer = () => {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loading, setLoading] = useState(true);
    const [votedMemes, setVotedMemes] = useState<string[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [viewHistory, setViewHistory] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            navigate("/");
            return;
        }
        setUserEmail(email);
        fetchData(email);
    }, [navigate]);

    const fetchData = async (email: string) => {
        try {
            setLoading(true);
            const [memesRes, votesRes] = await Promise.all([
                axios.get(`${SERVER_URL}/memes/all`),
                axios.post(`${SERVER_URL}/users/user-votes`, { email }),
            ]);
            setMemes(memesRes.data);
            setVotedMemes(votesRes.data.votedMemes);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (memeId: string) => {
        if (!userEmail) return;
        if (votedMemes.length >= 3) {
            alert("You can only vote for up to 3 memes!");
            return;
        }
        if (votedMemes.includes(memeId)) {
            alert("You have already voted for this meme!");
            return;
        }
        try {
            await axios.post(`${SERVER_URL}/memes/vote`, { memeId, userEmail });
            setVotedMemes([...votedMemes, memeId]);
            setMemes(memes.map(meme => meme._id === memeId ? { ...meme, votes: meme.votes + 1 } : meme));
        } catch (error) {
            console.error("Error voting for meme:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    if (loading) return <p className="text-center">Loading memes...</p>;

    return (
        <div className="p-5">
            <nav className="flex justify-between items-center bg-gray-800 p-4 rounded-lg text-white mb-5">
                <div className="flex gap-3 flex-col">
                    <span>Logged in as: <b>{userEmail}</b></span>
                    <button
                        className="bg-yellow-500 md:px-4 px-1 md:py-2 py-1 rounded hover:bg-yellow-600"
                        onClick={() => setViewHistory(!viewHistory)}
                    >
                        {viewHistory ? "Back to Voting" : "View History"}
                    </button>
                    <button
                        className="bg-red-500 md:px-4 px-1 md:py-2 py-1 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {votedMemes.length >= 3 && (
                <p className="text-red-500 text-center">You have reached the maximum vote limit.</p>
            )}

            {viewHistory ? (
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-center mb-4">Your Voted Memes:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {memes.filter(meme => votedMemes.includes(meme._id)).map(meme => (
                            <div key={meme._id} className="border rounded-lg p-3 shadow-lg">
                                <img src={meme.image} alt="Voted Meme" className="w-full h-auto rounded-md" />
                                <p className="text-center mt-2">Votes: {meme.votes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold text-center mb-4">Vote for Your Favorite Memes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {memes.map((meme) => (
                            <div key={meme._id} className="border rounded-lg p-3 shadow-lg">
                                <img src={meme.image} alt="Meme" className="w-full h-auto rounded-md" />
                                <div className="flex justify-between items-center mt-3">
                                    <button
                                        className={`p-2 cursor-pointer rounded ${
                                            votedMemes.includes(meme._id)
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-500 text-white'
                                        } ${votedMemes.length >= 3 && !votedMemes.includes(meme._id) ? 'bg-red-500 cursor-not-allowed' : ''}`}
                                        onClick={() => handleVote(meme._id)}
                                        disabled={votedMemes.includes(meme._id) || votedMemes.length >= 3}
                                    >
                                        {votedMemes.includes(meme._id) ? "Voted" : "Vote"}
                                    </button>
                                    <span>{meme.votes} Votes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MemeContainer;