const prisma = require('../models/prismaClient');


const getAllPredictionsByPlaneId = async (req, res) => {
    try{

        //var adminStatus =  parseInt(req.adminStatus);
        // if (adminStatus == 0) {
        //     return res.status(401).json({ error: 'Usuário não configurado' });
        // }

        const previsoes = await prisma.prediction.findMany({
            where: {
              runId: {
                not: {
                  equals: null,
                },
              },
            },
            select: {
                id: true,
                runId: true,
                preFail100: true, 
                preFail70: true,
                preFail50: true
            }
          });

        const runs = await prisma.runs.findMany({
            where: {
              id: {
                in: previsoes.map((previsao) => previsao.runId),
              },
            },
            select: {
              id: true,
              aircraftId: true,
            },
          }
        )

        const aircraftName = await prisma.aircrafts.findMany({
            select: {
                id: true,
                serialNumber: true
            },
          }
        )

        const resultadoFinal = {
            previsoes: previsoes,
            runs: runs,
            aircraftName: aircraftName
          };
                    

        return res.status(200).json(resultadoFinal);
        
    } catch (error) {
        console.error('Erro em buscar predições:', error);
        return res.status(500).json({ error: 'Erro em buscar predições' });
    }
}

module.exports = {
    getAllPredictionsByPlaneId,    
};