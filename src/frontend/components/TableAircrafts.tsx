"use client";
import React, { useEffect, useState } from 'react';
import { HOST, BACKPORT } from '@/public-variables';
import ItemTableAircraft from "@/components/ItemTableAircraft";
import Cookies from 'js-cookie'

type AircraftData = {
    id: number;
    serialNumber: string;
    name: string;
    model: string;
    isActive: string;
};

const TableAircrafts = () =>  {
    const meu_token = Cookies.get('token')

    const getAllAircrafts = `http://${HOST}:${BACKPORT}/aircraft/getAllAircrafts`;

    const [aircrafts, setAircrafts] = useState<AircraftData[]>([]);

    useEffect(() => {
        setTimeout(() => {

        fetch(getAllAircrafts, {
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
            if (data) setAircrafts(data);
        });
    }, 1000);
    }, [aircrafts]);

    return (
        <div className="bg-gray-100 shadow-md rounded-lg px-8 py-6 w-11/12 my-4 h-5/6 overflow-auto">
            <div className="flex justify-center">
                <table className="table-fixed">
                    <thead >
                        <tr>
                        <th className="text-md text-gray-700 px-8 pb-6">N° série</th>
                        <th className="text-md text-gray-700 px-8 pb-6">Nome</th>
                        <th className="text-md text-gray-700 px-8 pb-6">Modelo</th>
                        <th className="text-md text-gray-700 px-8 pb-6">Em atividade</th>
                        <th className="text-md text-gray-700 px-8 pb-6">Editar atividade</th>
                        </tr>
                    </thead>
                    <tbody className="divide-slate-300 divide-y">
                        {aircrafts
                            .slice() 
                            .sort((a, b) => a.serialNumber.localeCompare(b.serialNumber))
                            .map((aircraft) => (
                                <ItemTableAircraft
                                    key={aircraft.id}
                                    id={aircraft.id}
                                    serialNumber={aircraft.serialNumber}
                                    name={aircraft.name}
                                    model={aircraft.model}
                                    isActive={aircraft.isActive ? "Sim" : "Não"}
                                ></ItemTableAircraft>
                            ))}  
                    </tbody>

                </table>
            </div>
        </div>
    );
  }

  export default TableAircrafts;
