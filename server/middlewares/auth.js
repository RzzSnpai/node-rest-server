const jwt = require('jsonwebtoken');

//=================
// Verificar Token
//=================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.seed_jwt, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: ' token no valido '
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

//=================
// Verificar ADMIN_ROLE
//=================
let verificaAdmin = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es admin'
            }
        });
    }
};


module.exports = {
    verificaToken,
    verificaAdmin
};