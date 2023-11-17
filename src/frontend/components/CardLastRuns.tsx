import React from 'react';

type CardLastRunsProps = {
    title: any;
    version: any
    lastRun: any
  };

const CardLastRuns: React.FC<CardLastRunsProps> = (props) =>  {
    return (
        <div className="w-96 h-48 shadow-xl mr-4 mt-2 rounded-md bg-whiteIce font-montserrat duration-200 py-4 border-r-8 border-mainBlue">
            <h1 className="w-64 text-left px-4 font-bold text-lg">{props.title}</h1>
            <div className="text-left px-4 py-2">
                <p className="text-sm font-bold">Last Run</p>
                <p className="text-xs">{props.lastRun}</p>
            </div>
            <div className="text-left px-4 py-2">
                <p className="text-sm font-bold">Version</p>
                <p className="text-xs">{props.version}</p>
            </div>
        </div>
    );
  }

  export default CardLastRuns;
