require('dotenv').config();
const express = require('express');
const { disconnect } = require('../database');
const router = require('../routes/router'); // Importar o router
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.unsubscribe

// Usar o router para todas as rotas
app.use('/', router);

const PORT = process.env.PORT || 3000;

// Iniciar o servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Desconectar o Prisma ao encerrar o servidor (ex.: Ctrl+C ou reinício do Nodemon)
process.on('SIGINT', async () => {
    console.log('Encerrando o servidor...');
    await disconnect();
    server.close(() => {
        console.log('Servidor encerrado.');
        process.exit(0);
    });
});

// Tratar erros não capturados
process.on('uncaughtException', async (error) => {
    console.error('Erro não capturado:', error.message);
    await disconnect();
    process.exit(1);
});

process.on('unhandledRejection', async (reason) => {
    console.error('Rejeição não tratada:', reason);
    await disconnect();
    process.exit(1);
});