import NewPredictionForm from "@/components/NewPredictionForm/NewPredictionForm";
import SideBar from "@/components/SideBar/SideBar";
import DashMainSection from "@/components/DashMainSection/DashMainSection";
import HistoryGraph from "@/components/HistoryGraph/HistoryGraph";


const bleedModelPage = () => {
  return (
    <main>
      <div className="h-screen w-full relative">
        <SideBar />
          <DashMainSection>
            <h1 className="font-bold text-4xl mb-6 text-gray-700">Dashboard</h1>
            <h2 className="font-semibold text-3xl text-gray-600 mb-4">Nova Previsão</h2>
            <NewPredictionForm />
            <h2 className="font-semibold text-3xl text-gray-600 mt-10 mb-4">Estado das aeronaves</h2>
            <HistoryGraph/>
          </DashMainSection>
        
      </div>
    </main>
  );
};

export default bleedModelPage;