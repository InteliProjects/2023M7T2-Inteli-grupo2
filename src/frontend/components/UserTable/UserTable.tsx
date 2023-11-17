import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HOST, BACKPORT } from '@/public-variables';
import HeadTable from '@/components/UserTable/HeadTable';
import BodyTable from '@/components/UserTable/BodyTable';

type UserData = {
    id: number;
    name: string;
    position: string;
    email: string;
    adminStatus: number;
};

const UserTable = () => {
    const meu_token = Cookies.get('token');

    const getAllUsers = `http://${HOST}:${BACKPORT}/user/getAllUsers`;
    
    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {

        fetch(getAllUsers, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${meu_token}`
            },
        })
        .then((response) => {
            if (response.ok) return response.json();
        })
        .then((data) => {
            if (data) setUsers(data);
        });
    }, [users]);

    return (
        <table className="bg-gray-100 shadow-md rounded-lg w-[100%] overflow-auto ">
            <HeadTable />
            <tbody className="divide-slate-300 divide-y">
            {users
                .slice() // Crie uma cópia da matriz para não modificar a original
                .sort((a, b) => a.id - b.id)
                .map((user) => (
                    <BodyTable
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        position={user.position}
                        email={user.email}
                        adminStatus={user.adminStatus}
                    ></BodyTable>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;