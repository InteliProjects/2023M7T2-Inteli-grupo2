'use client';
import Image from "next/image";
import DashIcon from "../../assets/Dashboard.svg";
import AirplaneIcon from "../../assets/Airplane.svg";
import Settings  from "../../assets/Settings.svg";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStatusContext } from "@/contexts/StatusContext"


function SideBar() {

  const context = useStatusContext();

  if (!context) {
      return null; 
  }

  let { status } = context;

  const path = usePathname();

  return (
    <div className="bg-[#203D4A] h-screen fixed text-center min-w-[215px]">
      { status > 2 ? 
      (
      <div className="flex flex-col justify-between h-[95%]"> 
        <div>
        <Link
        href="/dashboard"
        className={`${path == '/dashboard' ? "bg-[#596D76] flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer" : 'flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer'}`}>
          <Image
            className="ml-2"
            src={DashIcon}
            width={35}
            alt="Dash icon"
          ></Image>
          <p className="p-2">Dashboard</p>
        </Link>

        <Link
        href="/aircrafts"
        className={`${path == '/aircrafts' ? "bg-[#596D76] flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer" : 'flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer'}`}>
          <Image
            className="ml-2"
            src={AirplaneIcon}
            width={30}
            alt="Dash icon"
          ></Image>
          <p className="p-2">Aeronaves</p>
        </Link>
        </div>
        <div>
        <Link
          href="/createUser"
          className={`${path == '/createUser' ? "bg-[#596D76] flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer" : 'flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer'}`}>
            <Image
              className="ml-2"
              src={Settings}
              width={25}
              alt="Dash icon"
            ></Image>
            <p className="p-2">Novo usuário</p>
        </Link>
        </div>
      </div>
      )
      : 
      <div>
        <div>
        <Link
        href="/dashboard"
        className={`${path == '/dashboard' ? "bg-[#596D76] flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer" : 'flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer'}`}>
          <Image
            className="ml-2"
            src={DashIcon}
            width={35}
            alt="Dash icon"
          ></Image>
          <p className="p-2">Dashboard</p>
        </Link>

        <Link
        href="/aircrafts"
        className={`${path == '/aircrafts' ? "bg-[#596D76] flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer" : 'flex mx-6 mt-6 text-lg font-montserrat rounded text-white font-semibold hover:scale-95 transition hover:cursor-pointer'}`}>
          <Image
            className="ml-2"
            src={AirplaneIcon}
            width={30}
            alt="Dash icon"
          ></Image>
          <p className="p-2">Aeronaves</p>
        </Link>
        </div>
      </div>
      }
                             
      </div>
  );
}

export default SideBar;
