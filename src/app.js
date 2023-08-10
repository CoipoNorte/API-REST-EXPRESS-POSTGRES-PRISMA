const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para el manejo de datos en formato JSON
app.use(express.json());

app.use('/user', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log('Server on port', port);
    console.log(`Open http://localhost:${port}`);
});