import axios from "axios";
import { useRef, useState } from "react";
import SERVER_URL from "../../../config/api";

const UploadMeme = () => {
    const memeImageRef = useRef<HTMLInputElement>(null);
    const userEmailRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const memeImageFile = memeImageRef.current?.files?.[0];
        const userEmail = userEmailRef.current?.value;
        if (!memeImageFile || !userEmail) {
            alert("All fields are required.");
            return;
        }
        setLoading(true);
        try {
            const userResponse = await axios.post(`${SERVER_URL}/owners/exists`, { email: userEmail });
            if (!userResponse.data.exists) {
                alert("User doesn't exist, try with correct credentials.");
                setLoading(false);
                return;
            }
            const memeOwnerId = userResponse.data.user._id;
            const formData = new FormData();
            formData.append("memeOwner", memeOwnerId);
            formData.append("image", memeImageFile);

            const memeResponse = await axios.post(`${SERVER_URL}/memes/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (memeResponse.status === 201) {
                alert("Meme successfully uploaded!");
                memeImageRef.current.value = "";
                userEmailRef.current.value = "";
            }
        } catch (error) {
            console.error("Error uploading meme:", error);
            alert("Something went wrong. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col m-5 w-full justify-center items-center">
            <h2 className="text-lg font-bold mb-3">Upload a Meme</h2>
            <form onSubmit={handleSubmit} className="border p-4 md:w-[60%]">
                <label htmlFor="userEmail" className="block font-medium">Enter Meme Owner Email</label>
                <input type="email" ref={userEmailRef} required className="border p-2 w-full mb-3" />

                <label htmlFor="memeImage" className="block font-medium">Upload the meme image</label>
                <input type="file" ref={memeImageRef} accept="image/*" required className="border p-2 w-full mb-3" />

                <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded w-full">
                    {loading ? "Uploading..." : "Upload Meme"}
                </button>
            </form>
        </div>
    );
};

export default UploadMeme;