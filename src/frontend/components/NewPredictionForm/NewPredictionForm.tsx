"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { useModelContext } from "@/contexts/ModelContext"
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios';
import { HOST, BACKPORT } from '@/public-variables';


const NewPredictionForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState('');
  const [optionAircraft, setOptionAircraft] = useState('');
  const [aircrafts, setAircrafts] = useState<ResponseAircrafts[]>([]);
  const [preFail50, setPreFail50 ] = useState(2);
  const [preFail70, setPreFail70 ] = useState(2);
  const [preFail100, setPreFail100 ] = useState(2);
  const [ carregando, setCarregando ] = useState(0);

  const context = useModelContext();

  if (!context) {
      return null; 
  }

  let { modelo } = context;

  type ResponseAircrafts = {
    id: number;
    name: string;
    serialNumber: string;
    model: string;
    isActive: boolean;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    alert("Solicitação enviada, aguarde o carregamento!")
    setCarregando(1);
    if (file) {
      const formData = new FormData();
      formData.append("parquetFile", file);
      
      const config = {
        headers: {
          'Authorization': `${token}`
        }
      };

      try { 
        const response = await axios.post(`http://${HOST}:${BACKPORT}/run/new/1/${optionAircraft}`, formData, config); 
        const lastObject = response.data.data[response.data.data.length - 1];
        setPreFail50(lastObject.preFail50);
        setPreFail70(lastObject.preFail70);
        setPreFail100(lastObject.preFail100);
        setCarregando(2);
        
      } catch (error) {
        alert("Erro ao realizar predição!")
        setCarregando(0);
        console.error("Erro ao enviar o arquivo:", error);
      }
    }
  };

  const handleAircrafts = async () => {
    if (token) {
      const url = `http://${HOST}:${BACKPORT}/aircraft/getAllAircrafts`
      const config = {
        headers: {
          'Authorization': `${token}`
        }
      };
      try{
        const response: AxiosResponse = await axios.get(url, config)
        console.log(response);
        setAircrafts(response.data);

      } catch (error) {
        console.error("Erro:", error);
      }
    }  
  };

  useEffect(() => {
    const meu_token = Cookies.get('token')
    console.log(meu_token)
    if (meu_token){
      setToken(meu_token);
      handleAircrafts();
    }
  
    
  }, [token]);

  return (
    <div className="grid bg-gray-100 text-xl  p-8 rounded-xl grid-cols-3">
      <div className="block">
        <label className="text-base">
          Aeronave
        </label>
        <br />
        <select
          className="border border-gray-300 rounded-md mb-4 mt-1 w-72 h-10 text-sm p-2 bg-white hover:cursor-pointer"
          value={optionAircraft}
          onChange={(e) => setOptionAircraft(e.target.value)}
        >
          <option value="" disabled>Escolha uma opção</option>
          {aircrafts ? (
            aircrafts.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))
          ) : ''}
        </select>
    
        <br />
        <label className="text-base" htmlFor="plane">Arquivo (.parquet)</label>
        <br />
        <input type="file" className="border border-gray-300 rounded-md mb-4 mt-1 w-72 h-10 text-sm p-2 bg-white hover:cursor-pointer" accept=".parquet" onChange={handleFileChange}/>
        <br />
        <button className="py-4 w-72 text-base bg-[#203D4A] rounded mt-6 text-white font-bold  hover:scale-95 transition"onClick={handleUpload}>Enviar</button>
      </div>
      <div className="col-span-2 border-l-2 pl-6">
        <p className="text-2xl mb-2 font-semibold text-gray-700">Resultados</p>
        <div className="h-4/5 w-full rounded-xl bg-gray-200 relative">    
              {
              carregando == 1 ?
              <div className=" absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
                <PuffLoader color="#203D4A" size={90} />
              </div>
               :
              carregando == 2 ?
              <div className="px-4 py-2">
                <h1 className="text-lg mt-2 font-semibold text-gray-700">Falha nos próximos 50 dias:</h1>
                <p className="text-base">{preFail50 == 0 ? "Não terá falhas nos próximos 50 dias" : "Falha apontada nos próximos 50 dias"}</p> 
                <h1 className="text-lg mt-2 font-semibold text-gray-700">Falha nos próximos 70 dias:</h1>
                <p className="text-base">{preFail70 == 0 ? "Não terá falhas nos próximos 70 dias" : "Falha apontada nos próximos 70 dias"}</p> 
                <h1 className="text-lg mt-2 font-semibold text-gray-700">Falha nos próximos 100 dias:</h1>
                <p className="text-base">{preFail100 == 0 ? "Não terá falhas nos próximos 100 dias" : "Falha apontada nos próximos 100 dias"}</p> 
              </div> : 
              <div className="flex justify-center">
                <p className="text-base pt-20">Inicie uma previsão escolhendo uma aeronave e enviando o arquivo ".parquet"</p>
              </div>
              }
            
        </div>
      </div>
    </div>
  );
};

export default NewPredictionForm;
