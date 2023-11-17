const bcrypt = require('bcrypt');
const prisma = require('../models/prismaClient');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const configureUser = async (req, res) => {
    try{
        const { email, previousPassword, newPassword, name, position} = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        
        const passwordMatch = await bcrypt.compare(previousPassword, user.hashedPassword);
        
        if (!passwordMatch){
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const adminStatus = 1;
        
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            hashedPassword: hashedPassword,
            name: name,
            position: position,
            adminStatus: adminStatus
          },
        });


        return res.status(201).json({ message: 'Usuário configurado com sucesso' });

    } catch (error) {
        console.error('Erro ao configurar usuário:', error);
        return res.status(500).json({ error: 'Erro ao configurar usuário' });
    }
};

const newUser = async (req, res) => {
  try{

    const admin = parseInt(req.adminStatus);
    if (admin != 2 && admin != 3) {
        return res.status(401).json({ error: 'Usuário não autorizado' });
    }

      const { email, password, } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminStatus = 0;
    
      const newUser = await prisma.user.create({
          data : {
              email,
              hashedPassword,
              adminStatus
          }
      })



      return res.status(201).json(newUser);

  } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

const updateUser = async (req, res) => {
  const { id, adminStatus } = req.body;
  
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { adminStatus: adminStatus },
    });

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const login = async (req, res) => {
    const { email , password } = req.body;   
    try {

      const login = await prisma.user.findUnique({
        where: {
            email: email,
        },
      });
         
      if (!login) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (login.adminStatus == 0) {
        return res.status(401).json({ error: 'Usuário não configurado' });
      }
  
      const passwordMatch = await bcrypt.compare(password, login.hashedPassword);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
      const token = jwt.sign({ loginId : login.id, adminStatus : login.adminStatus, email : login.email }, 'secreto', { expiresIn: '1h' });
  
      return res.json({ token });
  
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

const generatePassword = async (req, res) => {
    try {

      const admin = parseInt(req.adminStatus);
      
      if (admin != 2 && admin != 3) {
          return res.status(401).json({ error: 'Usuário não autorizado' });
      }

      const password = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      const hashedPassword = await bcrypt.hash(password, 10);
      return res.status(200).json({ password: password, hashedPassword: hashedPassword });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar senha' });
    }
  }

const sendEmail = async (req, res) => {
    try {

      const admin = parseInt(req.adminStatus);
      
      if (admin != 2 && admin != 3) {
          return res.status(401).json({ error: 'Usuário não autorizado' });
      }

      const { email, password, subject, body } = req.body;

      const messager = 'igor.garcia@sou.inteli.edu.br';
      const passwordMessager = 'anmt voxa peom zrgj';

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: messager,
          pass: passwordMessager
        }
      });

      const mailOptions = {
        from: messager,
        to: email,
        subject: subject,
        text: body
      };

      transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Erro ao enviar email' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: 'Email enviado com sucesso' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao enviar email' });
    }
  }

const getAllUsers = async (req, res) => {
    try{

        if (req.adminStatus != 2 && req.adminStatus != 3) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        const users = await prisma.user.findMany();
        return res.status(200).json(users);
        
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
}

module.exports = {
    configureUser,
    newUser,
    updateUser,
    login,
    generatePassword,
    sendEmail,
    getAllUsers
};