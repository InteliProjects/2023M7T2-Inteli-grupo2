import SideBar from "@/components/SideBar/SideBar";
import DashMainSection from "@/components/DashMainSection/DashMainSection";
import TableAircraftsModels from "@/components/TableAircrafts";
import NewAircraft from "@/components/NewAircraft";

const aircrafts = () => {
  return (
    <main>
      <div className="h-full w-full relative">
        <SideBar />
          <DashMainSection>
            <h1 className="font-bold text-4xl mb-6 text-gray-700">Aeronaves</h1>
            <div className="flex">  
                <div className="w-2/3 h-screen">
                    <h2 className="font-semibold text-2xl text-gray-600">Todas as Aeronaves</h2>
                    <TableAircraftsModels /> 
                </div>
                <div className="w-1/3 h-screen">
                  <h2 className="font-semibold text-2xl text-gray-600 ">Regista nova aeronave</h2>
                  <NewAircraft />
                </div>
            </div> 
          </DashMainSection>
        
      </div>
    </main>
  );
};

export default aircrafts;