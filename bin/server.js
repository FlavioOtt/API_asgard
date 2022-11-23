const app = require("../src/api");

app.use((req, res, next) => {
    next();
});

let port = 3000;

app.listen(port);

console.log("Iniciando o app na porta "+port);