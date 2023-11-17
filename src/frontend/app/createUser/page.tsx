'use client';

import SideBar from "@/components/SideBar/SideBar";
import CreateUser from '@/components/CreateUser';
import UserTable from '@/components/UserTable/UserTable';
import DashMainSection from "@/components/DashMainSection/DashMainSection";


const createUser = () => {
    return (
        <main>
            <div className="h-screen w-full relative">
                <SideBar />
                <DashMainSection>
                <div className="">
                    <div>
                        <h1 className="font-bold text-4xl mb-6 text-gray-700">Configurações</h1>
                        <h2 className="font-semibold text-3xl text-gray-600 mb-4 mt-10">Cadastrar Usuário</h2>
                        <CreateUser />
                        <h2 className="font-semibold text-3xl text-gray-600 mb-4 mt-10">Usuários Cadastrados</h2>
                        <UserTable/>
                    </div>
                </div>
                </DashMainSection>
            </div>
        </main>
    )
}

export default createUser;