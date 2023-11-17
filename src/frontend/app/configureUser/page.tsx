"use client";

import Image from 'next/image';
import InputForm from '@/components/InputForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HOST, BACKPORT } from '@/public-variables';
import axios from "axios";

const configureUser = () => {
  const[name, setFullName] = useState('');
  const[position, setPosition] = useState('');
  const[email, setEmail] = useState('');
  const[previousPassword, setPreviousPassword] = useState('');
  const[newPassword, setNewPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const handleConfigure = async () => {
    if (!name || !position || !email || !previousPassword || !newPassword || !confirmPassword){
      alert("Preencha todos os campos.")
      return
    }
    if (newPassword != confirmPassword){
      alert("Confirmação de senha incorreto.")
      return
    }
    try {
    const url = `http://${HOST}:${BACKPORT}/user/configureUser`
    const data = { name: name, position: position, email: email, previousPassword: previousPassword, newPassword: newPassword }

    const response = await axios.post(url, data);
    alert("Registrado com sucesso")

    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
    <div className="bg-[#F3F3F3] rounded-xl shadow-md px-16 m-20 w-1/4 py-4 h-[90%]">
      <button className='text-sm mb-4 font-montserrat text-mainBlue underline underline-offset-2 hover:scale-95 duration-100'
        onClick={() => router.push('/')}
      >&lt; Fazer login</button>
      <h2 className="font-montserrat mb-4 font-bold text-mainBlue text-2xl text-left pb-4">Configurar usuário</h2>
        < InputForm 
        label='Nome Completo' 
        type="string" 
        value={name}
        onChange={fullName => setFullName(fullName)}
        />
        < InputForm 
        label='Posição / Área' 
        type="string"
        value={position}
        onChange={position => setPosition(position)}
         />
        < InputForm 
        label='Email' 
        type="string"
        value={email}
        onChange={email => setEmail(email)}
         />
        < InputForm 
        label='Senha atual' 
        type="password"
        value={previousPassword}
        onChange={previousPassword => setPreviousPassword(previousPassword)}
        />
        < InputForm 
        label='Nova senha' 
        type="password"
        value={newPassword}
        onChange={newPassword => setNewPassword(newPassword)}
         />
        < InputForm 
        label='Confirmação de senha' 
        type="password" 
        value={confirmPassword}
        onChange={confirmPassword => setConfirmPassword(confirmPassword)}
        />
        <button 
        onClick={handleConfigure}
        className="w-full bg-mainBlue text-white mt-2 p-3 rounded font-montserrat hover:scale-95 duration-300 font-bold">Registrar</button>
    </div>

      <div className='m-20'>
      <Image
      alt='AviaAI'
      src='AviaAI.svg'
      width={400}
      height={400}
      className='hover:scale-105 duration-500'
      />
      </div>
    </div>
  );
};

export default configureUser;
