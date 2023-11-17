'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

type StatusData = {
  status: number;
  updateStatus: (newData: number) => void;
};

const StatusContext = createContext<StatusData | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState(0);

  const updateStatus = (newData: any) => {
    setStatus(newData);
  };

  return (
    <StatusContext.Provider value={{ status, updateStatus }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatusContext() {
  const context = useContext(StatusContext);
  return context;
}
