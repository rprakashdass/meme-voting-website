import { useEffect, useState } from 'react';
import axios from 'axios';

type UserType = {
    _id: string;
    name: string;
    phoneNumber: string;
    email: string;
}

const Users = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/users/all")
        .then( res => setUsers(res.data))
        .catch( err => console.error(err))
    }, []);

  return (
    <div className="m-5">
        <div className='flex flex-row gap-5 px-2 py-3 items-center justify-start'>
            {users.map((user, id) => (
                <div key={id} className='flex flex-col justify-start  px-2 py-3 border border-blue-500'>
                    <h1>Name: {" "} {user.name}</h1>
                    <h1>Phone Number: {" "} {user.phoneNumber}</h1>
                    <h1>Email: {" "} {user.email}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Users