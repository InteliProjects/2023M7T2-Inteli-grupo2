import React from 'react';
import { useRouter } from "next/navigation";
import { useModelContext } from '../contexts/ModelContext';

type CardModelsProps = {
    title: any;
    description: any;
    version: any;
    value: number;
  };

const CardModels: React.FC<CardModelsProps> = (props) =>  {
    const router = useRouter();

    const context = useModelContext();

    if (!context) {
        return null; 
    }

    let { updateModelo } = context;

    const handleClick = async () => {
        updateModelo(props.value);
        router.push('/dashboard');
    }

    return (
        <button className="w-96 h-48 shadow-xl mr-4 mt-2 rounded-md bg-whiteIce font-montserrat duration-200	hover:scale-95 border-r-8 border-mainBlue"
        onClick={handleClick}
        >
            <h1 className="w-64 text-left px-4 font-bold text-lg">{props.title}</h1>
            <div className="text-left px-4 py-2">
                <p className="text-sm font-bold">Version</p>
                <p className="text-xs">{props.version}</p>
            </div>
            <div className="text-left px-4 py-2">
                <p className="text-sm font-bold">Description</p>
                <p className="text-xs">{props.description}</p>
            </div>
        </button>
    );
  }

  export default CardModels;
