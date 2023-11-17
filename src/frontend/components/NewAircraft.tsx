"use client";
import { FormEvent } from 'react';
import { HOST, BACKPORT } from '@/public-variables';
import Cookies from 'js-cookie';

const NewAircraft = () => {
    const meu_token = Cookies.get('token');

    const registerAircraft = `http://${HOST}:${BACKPORT}/aircraft/newAircraft`;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

       const data = new FormData(event.target as HTMLFormElement);

       var isActiveValue = true;
       if (data.get('isActive') == "false") {
           isActiveValue = false;
       }

       const requestData = {
            model: data.get('model'),
            name: data.get('name'),
            serialNumber: data.get('serialNumber'),
            isActive: isActiveValue,
       }

        fetch(registerAircraft, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${meu_token}`,
            },
            body: JSON.stringify(requestData),
        })
        .then((response) => {
            if (response.ok) return response.json();
        })
        .then((data) => {
            if (data) alert("Cadastrado com sucesso!");
            
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-gray-100 shadow-md rounded-lg px-8 py-12  my-4 h-5/6 overflow-auto">
                <h2 className="text-base pt-4">Modelo:</h2>
                <input type="text" name='model' className="border border-gray-300 rounded-lg w-full p-2 mt-2 focus:outline-none text-sm" />

                <h2 className="text-base pt-8">Nome:</h2>
                <input type="text" name='name' className="border border-gray-300 rounded-lg w-full p-2 mt-2 focus:outline-none text-sm" />

                <h2 className="text-base pt-8">N° de série:</h2>
                <input type="text" name='serialNumber' className="border border-gray-300 rounded-lg w-full p-2 mt-2 focus:outline-none text-sm" />

                <h2 className="text-base pt-8">Está em atividade?:</h2>
                <select name='isActive' className="mb-2 border border-gray-300 bg-white rounded-lg w-full p-3 mt-2 focus:outline-none text-sm" >
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                </select>

                <button className="mt-12 bg-mainBlue text-white font-bold w-full p-3 rounded-md hover:scale-95 duration-300" type='submit'>
                    Registrar
                </button>
            </div>
        </form>
    );
  }

  export default NewAircraft;
