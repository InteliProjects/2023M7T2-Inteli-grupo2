const express = require('express');
const router = express.Router();
var authenticateToken = require('../middlewares/auth')

const userController = require('../controllers/userController')

// Permissionamento:
// 0 - usuário que recebeu um convite, mas ainda não aceitou
// 1 - usuário comum
// 2 - admin - usuário com permissão de convidar outros usuários
// 3 - superadmin - usuário com permissão de convidar outros usuários e de alterar permissões de outros usuários

// login
router.post('/login', (req, res) => {
    userController.login(req, res)
})

//configurar usuário de permissião nível 0 para virar nível 1. Acessível pelo próprio usuário
router.post('/configureUser', (req, res) => {
    userController.configureUser(req, res);
});

//logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

//registrar um novo usuário. Apenas acessível à usuários com permissão nível 2 ou 3
router.post('/register',  authenticateToken, (req, res) => {
    userController.newUser(req, res);
})

// atualiza o statusAsmin de um usuário
router.put('/update', authenticateToken, (req, res) => {
    userController.updateUser(req, res);
})

// gera uma senha aleatória para um usuário
router.get('/generatePassword', authenticateToken, (req, res) => {
    userController.generatePassword(req, res);
})

// envia um email para um usuário recém cadastrado com a senha gerada
router.post('/sendEmail', authenticateToken, (req, res) => {
    userController.sendEmail(req, res);
})

//get all users
router.get('/getAllUsers', authenticateToken, (req, res) => {
    userController.getAllUsers(req, res);
})

module.exports  = router;