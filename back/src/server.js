const express = require('express');

const routes = require('./routes')
const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use(routes);


// notFound
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error);
})

// catch all
app.use((error, req, res, next)=> {
    res.status(error.status || 500)
    res.json({ error: error.message})
})

app.listen(3333, () => console.log("server rodando na porta", 3333));