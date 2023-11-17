import React from 'react';
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";

type TopBarProps = {
    email: string;
  };

const TopBar: React.FC<TopBarProps> = (props) =>  {
    const router = useRouter();
    const handleSair = async () => {
        Cookies.remove('token');
        router.push('/');
    }

    return (
        <div className="w-screen h-12 bg-mainBlue">
            <div className="flex justify-between items-center h-12 mx-6 text-white font-montserrat text-sm">
                <div className="flex gap-6">
                    <p>Email: {props.email}</p>
                </div>
                <button className="mr-6 underline hover:scale-105 font-bold" onClick={handleSair}>
                    Sair
                </button>
            </div>
      </div>
    );
  }

  export default TopBar;
