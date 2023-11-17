'use client'
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";
import { AxiosResponse } from 'axios';

const primaryColor = "#203D4A";
const secondaryColor = "#596D76";

const Chart: React.FC = () => {

  type ResponsePrevisoes = {
    id: number
    runId: number;
    preFail100: number;
    preFail70: number;
    preFail50: number;
  }

  type ResponseAircraftName = {
    id: number;
    serialNumber: string;
  }

  type ResponseRuns = {
    id: number;
    aircraftId: number;
  }
  type DataFinal = {
    name: string;
    health_status: number;
    fill: string;
  }
  
  const [previsoes, setPrevisoes] = useState<ResponsePrevisoes[]>([]);
  const [aircraftName, setAircraftName] = useState<ResponseAircraftName[]>([]);
  const [runs, setRuns] = useState<ResponseRuns[]>([]);
  const [data, setData] = useState<DataFinal[]>([])

  function findRunIdMaisLonge(data: ResponsePrevisoes[]): ResponsePrevisoes[] {
    if (data.length === 0) {
      return []; // Retorna um array vazio se o array de dados estiver vazio
    }
  
    // Organize os dados em grupos com base no runId
    const grupos: { [key: number]: ResponsePrevisoes[] } = {};
    data.forEach((item) => {
      if (!grupos[item.runId]) {
        grupos[item.runId] = [];
      }
      grupos[item.runId].push(item);
    });
  
    const linhasMaisLonges: ResponsePrevisoes[] = [];
  
    for (const runId in grupos) {
      const grupo = grupos[parseInt(runId)];
  
      // Ordene o grupo com base no ID em ordem crescente
      grupo.sort((a, b) => a.id - b.id);
  
      // O elemento com o maior ID será o mais distante
      linhasMaisLonges.push(grupo[grupo.length - 1]);
    }
  
    return linhasMaisLonges;
  }

  const handleChart = async () => {
  
      const url = "http://ec2-3-88-225-183.compute-1.amazonaws.com:3001/prediction/result"
      // const config = {
      //   headers: {
      //     'Authorization': `${token}`
      //   }
      // };
      try{
        const response: AxiosResponse = await axios.get(url)
        setPrevisoes(findRunIdMaisLonge(response.data.previsoes))
        setAircraftName(response.data.aircraftName)
        setRuns(response.data.runs)
  
      } catch (error) {
        console.error("Erro:", error);
      }
  };

  const handleData = async () => {
    const dados = aircraftName
      .filter(aviao => runs.some(run => run.aircraftId === aviao.id)) 
      .map(aviao => {
    const matchingRuns = runs.filter(run => run.aircraftId === aviao.id);
    const health_status = matchingRuns.reduce((status, run) => {
      const previsao = previsoes.find(p => p.runId === run.id);

      if (previsao) {
        if (previsao.preFail50 === 1) {
          return 1;
        } else if (previsao.preFail70 === 1 || previsao.preFail100 === 1) {
          return Math.min(status, 2);
        } else if (previsao.preFail100 === 0) {
          return Math.min(status, 3);
        }
      }
      return status;
    }, 3);

    const fill = (health_status === 1) ? "red" : (health_status === 2) ? secondaryColor : primaryColor;

    return {
      name: aviao.serialNumber,
      health_status,
      fill,
    };
    });

    dados.sort((a, b) => a.health_status - b.health_status);

    setData(dados)
  }

  useEffect(() => {
    setTimeout(() => {
    handleChart()
    handleData()
  }, 1000);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="health_status" fill="fill" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
