const { Router } = require('express');
const router = Router();
const userControllers = require('../controllers/user.controllers');

// getUsers (Obtener usuarios)
router.get('/', userControllers.getUsers);

// getUserById (obtener un usuario por id)
router.get('/:id', userControllers.getUserById);

// setUser (agregar un usuario)
router.post('/', userControllers.setUser);

// updateUser (actualizar un usuario por id)
router.put('/:id', userControllers.updateUser);

// deleteUserById (eliminar un usuario por id)
router.delete('/:id', userControllers.deleteUserById);

module.exports = router;