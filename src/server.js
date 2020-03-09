const app = require('./app');

app.listen(process.env.port, () => console.log(`Rodando na porta ${process.env.port}`));