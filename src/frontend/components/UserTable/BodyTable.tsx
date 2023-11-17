import React from 'react';
import Cookies from 'js-cookie';
import { HOST, BACKPORT } from '@/public-variables';

type ItemTableProps = {
    id: number;
    name: string;
    position: string;
    email: string;
    adminStatus: number;
  };

const BodyTable: React.FC<ItemTableProps> = (props) =>  {
    
  const UpdateUser = (id: number, status: number) => {
    const meu_token = Cookies.get('token');

    const updateUser = `http://${HOST}:${BACKPORT}/user/update`;

    console.log(`
    id: ${id},\n
    Adminstatus: ${status}
    `);

    fetch(updateUser, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${meu_token}`
        },
        body: JSON.stringify({ id: id, adminStatus: status })
    })
    .then((response) => {
        if (response.ok) return response.json();
    })
    .then((data) => {
        if (data) console.log(data);
    });
    }

    return (
          <tr>
          <td className="text-sm text-gray-700 px-2 py-4 text-center">{props.id}</td>
          <td className="text-sm text-gray-700 px-2 py-4 text-center">{props.name}</td>
          <td className="text-sm text-gray-700 px-2 py-4 text-center">{props.position}</td>
          <td className="text-sm text-gray-700 px-2 py-4 text-center">{props.email}</td>
          <td className="text-sm px-2 py-4 text-center">
          <select className="hover:underline p-1 rounded-md" defaultValue={props.adminStatus} onChange={(e) => UpdateUser(props.id, parseInt(e.target.value))}>
            <option value={0}>Level 0</option>
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
          </select>
          </td>
          </tr>
    );
  }

export default BodyTable;