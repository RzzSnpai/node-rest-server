const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaAdmin } = require('../middlewares/auth');


const app = express();





app.get('/usuario', verificaToken, (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);


    Usuario.find({ estado: true }, 'nombre email google estado')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            })


        })


})

app.post('/usuario', [verificaToken, verificaAdmin], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });



    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         message: 'El nombre wachim'
    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

})

app.put('/usuario/:id', [verificaToken, verificaAdmin], function(req, res) {

    let idxd = req.params.id;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(idxd, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })



})

app.delete('/usuario/:id', [verificaToken, verificaAdmin], function(req, res) {

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: ' usuario no encontrado '
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    });




    // res.json('deletea2 usuario po');
})

module.exports = app;