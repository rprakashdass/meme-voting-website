import { useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../../../config/api';
import Loading from '../../util/Loading';

type UserType = {
    _id: string;
    name: string | null;
    phoneNumber: string | null;
    email: string | null;
    role: string | null;
};

const ViewUsers = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/users/all`)
            .then(res => setUsers(res.data))
            .catch(err => {
                setError("Failed to fetch users")
                console.error(err)
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading/>
    if (error) return <div className="text-center text-red-500 p-5">{error}</div>;

    return (
        <div className="m-5">
            <h2 className="text-xl font-bold mb-4">Registered Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="border border-blue-500 rounded-lg p-4 shadow-md">
                            <h3 className="font-semibold">Name: {user.name || "N/A"}</h3>
                            <p className="text-gray-700">Phone: {user.phoneNumber || "N/A"}</p>
                            <p className="text-gray-700">Email: {user.email || "N/A"}</p>
                            <p className="text-gray-700">Role: {user.role || "N/A"}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewUsers;