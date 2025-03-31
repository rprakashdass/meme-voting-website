import { FormEvent, useState } from "react";
import axios from "axios";
import SERVER_URL from "../../../config/api";

export const AddMemeOwners = () => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await axios.post(`${SERVER_URL}/owners/add`, formData);
            setMessage("Meme owner added successfully");
            setFormData({ name: "", phoneNumber: "", email: "" });
        } catch (error) {
            setMessage("Error adding meme owner");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Add Meme Owner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name (optional)"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number (optional)"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter owner email (required)"
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Owner"}
                </button>
            </form>
            {message && <p className="text-center mt-3 text-gray-700">{message}</p>}
        </div>
    );
};

export default AddMemeOwners;