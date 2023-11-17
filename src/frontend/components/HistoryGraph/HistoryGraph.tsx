import Image from "next/image";
import { useState } from "react";
import MockGraph from "../../assets/MockGraph.svg"
import Chart from "@/components/Charts"

const HistoryGraph: React.FC = () => {

  return (
    <div className="flex bg-gray-100 text-xl p-8 rounded-xl">
        <Chart />
        <div className="ml-12">
          <h1>Legenda</h1>
          <div className="flex gap-1 text-base items-center my-2">
            <div className="h-8 w-8 bg-[#ff0000]"></div>
            <p>Warning</p>
          </div>
          <div className="flex gap-1 text-base items-center my-2">
            <div className="h-8 w-8 bg-[#596D76]"></div>
            <p>Attention</p>
          </div>
          <div className="flex gap-1 text-base items-center my-2">
            <div className="h-8 w-8 bg-[#203D4A]"></div>
            <p>OK</p>
          </div>
        </div>

    </div>
  );
};

export default HistoryGraph;
