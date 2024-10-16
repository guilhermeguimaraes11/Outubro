//Importa a instância do Express configurada em index.js
const app = require("./index");
const cors = require('cors')
//Inicia o servidor na porta 5000, tornando a API acessível em http://localhost:5000

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSucessStatus: 204
};

app.use(cors(corsOptions));
app.listen(5000);