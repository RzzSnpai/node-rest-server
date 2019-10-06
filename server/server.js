require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//parse application x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse aplication/json
app.use(bodyParser.json());



app.get('/usuario', function(req, res) {
    res.json('get usuario po');
})

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'El nombre wachim'
        });
    } else {
        res.json({
            persona: body
        });
    }

})

app.put('/usuario/:id', function(req, res) {

    let idxd = req.params.id;



    res.json({
        id: idxd
    });
})

app.delete('/usuario', function(req, res) {
    res.json('deletea2 usuario po');
})
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})