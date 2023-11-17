import React from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { HOST, BACKPORT } from '@/public-variables';

type ItemTableAircraftProps = {
    id: number;
    serialNumber: string;
    name: string;
    model: string;
    isActive: string;
  };

const ItemTableAircraft: React.FC<ItemTableAircraftProps> = (props) =>  {
    
    const DeleteAircraft = (id: number) => {
        const meu_token = Cookies.get('token');
    
        const changeActivityAircraft = `http://${HOST}:${BACKPORT}/aircraft/changeActivityAircraft`;
    
        fetch(changeActivityAircraft, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${meu_token}`
            },
            body: JSON.stringify({ id: id })
        })
        .then((response) => {
            if (response.ok) return response.json();
        })
        .then((data) => {
            if (data) console.log(data);
        })
        .catch((error) => {
            console.error("Erro na solicitação:", error);
        });
        
    }

    return (
        <tr>
            <td className="text-sm text-gray-700 px-2 py-4 text-center ">{props.serialNumber}</td>
            <td className="text-sm text-gray-700 px-2 py-4 text-center ">{props.name}</td>
            <td className="text-sm text-gray-700 px-2 py-4 text-center ">{props.model}</td>
            <td className="text-sm text-gray-700 px-2 py-4 text-center ">{props.isActive}</td>
            <td className="text-sm text-gray-700 px-10 py-4 text-center ">
                <button className="w-12 h-8 rounded-md flex justify-center items-center bg-mainBlue hover:scale-95 duration-300" onClick={(e) => DeleteAircraft(props.id)}>
                <Image src="/change.svg" alt="" width={20} height={20} />
                </button>
            </td>
        </tr>
    );
  }

  export default ItemTableAircraft;
