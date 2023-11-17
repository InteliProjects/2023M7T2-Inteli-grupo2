'use client'
import { useEffect, useState } from 'react';
import CardModels from "@/components/CardModels"
import CardLastRuns from "@/components/CardLastRuns";
import TopBar from "@/components/TopBar"
import Cookies from 'js-cookie'
import axios from "axios";
import { AxiosResponse } from 'axios';
import { useRouter } from "next/navigation";
import { useStatusContext } from "@/contexts/StatusContext"
import { HOST, BACKPORT } from '@/public-variables';

export default function models() {

  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [models, setModels] = useState<ResponseModels[]>([]);
  const [runs, setRuns] = useState<ResponseRuns[]>([]);
  const router = useRouter();

  const context = useStatusContext();

  if (!context) {
      return null; 
  }

  let { updateStatus } = context;

  type ResponseModels = {
    id: number;
    title: string;
    description: string;
    version: string;
  }

  type ResponseRuns = {
    id: number;
    datetime: any;
    modelId: number;
    executedById: number;
  }

  const handleModel = async () => {
    if (token) {
      const url = `http://${HOST}:${BACKPORT}/model/all`
      const config = {
        headers: {
          'Authorization': `${token}`
        }
      };
      try {
        const rs: AxiosResponse = await axios.get(url, config); 
        if (rs){
          setModels(rs.data.models)
          setEmail(rs.data.email)
          updateStatus(rs.data.adminStatus)
        }

      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  const handleLastRuns = async () => {
    if (token) {
      const url = `http://${HOST}:${BACKPORT}/run/all`
      const config = {
        headers: {
          'Authorization': `${token}`
        }
      };
      try {
        const rs: AxiosResponse = await axios.get(url, config); 
        if (rs){
          setRuns(rs.data)
          console.log(rs.data)
        }

      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  useEffect(() => {
    const meu_token = Cookies.get('token')
    if (meu_token){
      setToken(meu_token);
      handleModel()
      handleLastRuns()
    }
    else {
      router.push("/");
    }
    
    
  }, [token]);
  
  return (

    <main className="overflow-x-hidden">

      <TopBar 
      email={email} />

      <div className="m-8">
        
        <h1 className="font-montserrat font-bold text-mainBlue text-3xl">Available models</h1>
        <div className="my-4 flex flex-wrap">
        {models ? (
          models.map(item => (
            <CardModels
              value={item.id}
              key={item.id}
              title={item.title} 
              version={item.version}
              description={item.description}
            />
          ))
        ) : (
          <div></div>
        )}
        </div>

        <div className="pt-4 font-montserrat">
          <div className="flex">
            <h1 className="font-bold text-mainBlue text-3xl pr-6">Last runs</h1>
          </div>    
        </div>

        <div className="my-4 flex flex-wrap">
        {runs ? (
          runs
          .sort((a, b) => b.id - a.id)
          .map(item => (
            <CardLastRuns 
              key={item.id}
              lastRun={item.datetime}
              title={models.map(modelItem => (item.modelId ==  modelItem.id ? modelItem.title : ""))} 
              version={models.map(modelItem => (item.modelId ==  modelItem.id ? modelItem.version : ""))} 
            />
          ))
        ) : (
          <div></div>
        )}
        </div>

      </div>
    </main>
  );
}
