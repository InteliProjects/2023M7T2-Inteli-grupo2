const prisma = require('../models/prismaClient');

const newModel = async (req, res) => {
    try {

        var adminStatus =  parseInt(req.adminStatus);
        if (adminStatus == 0) {
            return res.status(401).json({ error: 'Usuário não configurado' });
        }

        const { version, title, description } = req.body;
        console.log(title);
        const newModel = await prisma.model.create({
            data: {
                version,
                title,
                description
            }
        });

        return res.status(201).json(newModel);
  
    } catch (error) {
      console.error('Erro ao criar modelo', error);
      throw error;
    }
};

const getAll = async (req, res) => {
    try {

        var adminStatus =  parseInt(req.adminStatus);
        if (adminStatus == 0) {
            return res.status(401).json({ error: 'Usuário não configurado' });
        }
        
        const models = await prisma.model.findMany();
        const resposta = {
            models: models,
            email: String(req.email),
            name: String(req.name),
            adminStatus: adminStatus
        }
        return res.status(200).json(resposta);
        
    } catch (error) {
        console.error('Erro ao buscar modelos', error);
        throw error;
    }
};


module.exports = {
    newModel,
    getAll
};