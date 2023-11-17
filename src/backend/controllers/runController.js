const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const prisma = require('../models/prismaClient');

const newRun = async (req, res) => {
  try {

    // var adminStatus =  parseInt(req.adminStatus);
    // if (adminStatus == 0) {
    //     return res.status(401).json({ error: 'Usuário não configurado' });
    // }

    const modelId = parseInt(req.params.modelId);
    const executedById = parseInt(req.userId);
    const aircraftId = parseInt(req.params.aircraftId);
    console.log(modelId)
    console.log(executedById)
    console.log(aircraftId)


    const newRun = await prisma.runs.create({
        data : {
            modelId,
            executedById,
            aircraftId
        }
    })

    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado.');
      }
      
    const filePath = 'temp.parquet';
    fs.writeFileSync(filePath, req.file.buffer);

    const apiUrl = 'http://ec2-3-85-39-131.compute-1.amazonaws.com:5000/api'; 
    const formData = new FormData();
    formData.append('parquetFile', fs.createReadStream(filePath));

    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    fs.unlinkSync(filePath); 

    const responseData = {
      status: response.status,
      data: response.data,
    };
    
    return res.status(201).json(responseData);


  } catch (error) {
    console.log("teste")
    console.error('Erro ao criar nova Run', error);
    throw error;
  }
};

const runsAll = async (req, res) => {
  try {

    var adminStatus =  parseInt(req.adminStatus);
    if (adminStatus == 0) {
        return res.status(401).json({ error: 'Usuário não configurado' });
    }

    const runs = await prisma.runs.findMany();

    return res.status(201).json(runs);


  } catch (error) {
    console.error('Erro ao obter runs por id', error);
    throw error;
  }
};



module.exports = {
    newRun,
    runsAll
};