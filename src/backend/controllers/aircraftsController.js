const prisma = require('../models/prismaClient');


const getAllAircrafts = async (req, res) => {
    try {

        var adminStatus =  parseInt(req.adminStatus);
        if (adminStatus == 0) {
            return res.status(401).json({ error: 'Usuário não configurado' });
        }

        const aircrafts = await prisma.aircrafts.findMany();

        return res.status(201).json(aircrafts);
  
    } catch (error) {
      console.error('Erro ao buscar aeronaves', error);
      throw error;
    }
};

const newAircraft = async (req, res) => {
    try {

        var adminStatus =  parseInt(req.adminStatus);
        if (adminStatus != 3 && adminStatus != 2){
            return res.status(401).json({ error: 'Usuário não autorizado' });
        }

        const { name, serialNumber, model, isActive } = req.body;
        
        const aircraft = await prisma.aircrafts.findFirst({
            where: {
                serialNumber: serialNumber,
            },
          });

        if (aircraft) {
            res.status(400).json({ mensagem: 'Número de série já cadastrado.' });
        } 
        else {
            const newModel = await prisma.aircrafts.create({
                data: {
                    name,
                    serialNumber,
                    model,
                    isActive
                }
            });
    
            return res.status(201).json(newModel);
        }
  
    } catch (error) {
      console.error('Erro ao criar aeronave', error);
      throw error;
    }
};

const changeActivityAircraft = async (req, res) => {
    try {
        const { id } = req.body;

        const aircraft = await prisma.aircrafts.findUnique({
            where: {
                id: id
            }
        });

        if (!aircraft) {
            return res.status(404).json({ error: 'Aeronave não encontrada' });
        }

        var adminStatus = parseInt(req.adminStatus);
        if (adminStatus != 2 && adminStatus != 3) {
            return res.status(401).json({ error: 'Usuário não autorizado' });
        }

        const updatedModel = await prisma.aircrafts.update({
            where: {
                id: id
            },
            data: {
                isActive: !aircraft.isActive
            }
        });

        return res.status(201).json(updatedModel);
    } catch (error) {
        console.error('Erro ao atualizar aeronave', error);
        throw error;
    }
};




module.exports = {
    newAircraft,
    changeActivityAircraft,
    getAllAircrafts
};