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
    urlDB = 'mongodb+srv://snpai:KG8anDIYfgEvC2r2@primer-cluster-9yw5r.gcp.mongodb.net/cafe'
}
process.env.URLDB = urlDB;