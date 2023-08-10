const { Router } = require('express');
const router = Router();
const userControllers = require('../controllers/user.controllers');

// GET getUsers /getusers (Obtener usuarios)
router.get('/getusers', userControllers.getUsers);

// GET getUserById /getuserid/:id (obtener un usuario por id)
router.get('/getuserid/:id', userControllers.getUserById);

// POST setUser /adduser (agregar un usuario)
router.post('/adduser', userControllers.setUser);

// PUT updateUser /updateuser/:id (actualizar un usuario por id)
router.put('/updateuser/:id', userControllers.updateUser);

// DELETE deleteUserById /deleteuserid/:id (eliminar un usuario por id)
router.delete('/deleteuserid/:id', userControllers.deleteUserById);

module.exports = router;