//===========================
//        puerto
//===========================


process.env.PORT = process.env.PORT || 3123;


// =======================
// ENTORNO
//=========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
// BASE DE DATOS
//=========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;


// =======================
// Vencimiento del token
//=========================
// 60 segundos * 60 minutos * 24 horas * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
// =======================
// Seed de autenticacion
//=========================
process.env.SEED = process.env.SEED || "seed-secretito"
let seed_jwt;
if (process.env.NODE_ENV === 'dev') {
    seed_jwt = 'seed-secretito';
} else {
    seed_jwt = process.env.SEED;
}
process.env.seed_jwt = seed_jwt;