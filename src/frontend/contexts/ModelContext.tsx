'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

type ModelData = {
  modelo: number;
  updateModelo: (newData: number) => void;
};

const ModelContext = createContext<ModelData | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [modelo, setModelo] = useState(0);

  const updateModelo = (newData: any) => {
    setModelo(newData);
  };

  return (
    <ModelContext.Provider value={{ modelo, updateModelo }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  const context = useContext(ModelContext);
  return context;
}
