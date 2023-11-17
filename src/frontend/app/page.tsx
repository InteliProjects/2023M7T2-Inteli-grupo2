"use client";

import { useState } from 'react';
import Image from 'next/image';
import InputForm from '@/components/InputForm';
import axios from "axios";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { HOST, BACKPORT } from '@/public-variables';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
  const handleLogin = async () => {
    if (email != '' && password != '') {
      const url = `http://${HOST}:${BACKPORT}/user/login`
      const data = { email, password }

      try {
        const response = await axios.post(url, data); 
        console.log("feito")

        if (response.data.token) {
          const inOneHour = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
          Cookies.set('token', response.data.token, { expires: inOneHour, secure: true });
          router.push("/models");
        }
        else{
          console.log(response.data.error)
        }

      } catch (error) {
        alert("Credenciais invalidas! - Antes do primeiro login configure o usuário.")
        console.error("Erro ao fazer login:", error);
      }
    }
    else {
      alert("Preencha todos os campos de login.")
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="bg-[#F3F3F3] rounded-xl shadow-md px-16 min-h-fit	m-20 w-1/4 py-12">
        <h2 className="font-montserrat mb-4 font-bold text-mainBlue text-2xl text-left pb-2">Login</h2>
          < InputForm 
          label='Email' 
          type="string"
          value={email} 
          onChange={value => setEmail(value)}
          />
          < InputForm 
          label='Senha' 
          type="password"
          value={password} 
          onChange={value => setPassword(value)}
           />
          <button className="w-full bg-mainBlue text-white mt-2 p-3 rounded font-montserrat hover:scale-95 duration-300 font-bold" onClick={handleLogin}>Login</button>
          <div className='flex justify-center mt-4'>
            <button 
            onClick={() => router.push('/configureUser')}
            className='text-sm mb-4 font-montserrat text-mainBlue underline underline-offset-2 hover:scale-95 duration-100'>Configurar usuário</button>
          </div>
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
}

export default LoginPage;
