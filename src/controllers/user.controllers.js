const prisma = require('../database/prisma.db');

// GET getUsers /getusers (Obtener usuarios)
exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// GET getUserById /getuserid/:id (obtener un usuario por id)
exports.getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// POST setUser /adduser (agregar un usuario)
exports.setUser = async (req, res) => {
    try {
        const { email, pass, rol } = req.body;
        const newUser = await prisma.user.create({
            data: {
                email,
                pass,
                rol,
            },
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// PUT updateUser /updateuser/:id (actualizar un usuario por id)
exports.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { email, pass, rol } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                email,
                pass,
                rol,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// DELETE deleteUserById /deleteuserid/:id (eliminar un usuario por id)
exports.deleteUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.user.delete({
            where: { id },
        });
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
