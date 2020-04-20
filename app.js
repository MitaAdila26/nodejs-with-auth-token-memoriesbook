const express = require('express');
const detail = require('morgan');
const conn = require('./conn');
const bodyParser = require('body-parser');
var app=express();
var user = require('./user');
var getuserRoute = require('./post');

app.use(detail('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    global.db = conn;
    app.post('/signin',user.signin);
    app.post('/check_user',user.check_user);
    app.use('/getuser',getuserRoute);

app.get('/all',(req,res)=>{
    var sql = "select * from siswa";
    conn.query(sql,(error,rows)=>{
        if(error){
            res.send(404).json({
                pesan : "Tidak mendapat data"
            });
        }
        res.json(rows);
        console.log(rows);
    });
});

app.get('/pass/:email',(req,res)=>{
    var email = req.query.email;
    var sql = "select password from siswa where email=?"
    conn.query(sql,[email],function(error,rows){
        if(error){
            res.send(404).json({
                pesan : 'tidak tersedia'
            });
        }
        res.json(rows);
        console.log(rows);
    })
})

app.post('/isi',(req,res)=>{
    var nama = req.body.nama;
    var no_hp = req.body.no_hp;
    var kampung = req.body.kampung;
    var desa = req.body.desa;
    var kecamatan = req.body.kecamatan;
    var pesan = req.body.pesan;
    var kesan = req.body.kesan;
    var sql = "insert into siswa(nama,no_hp,kampung,desa,kecamatan,pesan,kesan) values (?,?,?,?,?,?,?)";
    conn.query(sql,[nama, no_hp, kampung, desa, kecamatan, pesan, kesan],function(error,rows){
        if(error){
            res.send(404).json({
                pesan : 'tidak mendapat insert'
            });
        }
        res.json({
            pesan : "berhasil insert"
        });
        console.log(rows);
    });
});

app.put('/ubah',(req,res)=>{
    var id = req.query.id
    var nama = req.body.nama;
    var no_hp = req.body.no_hp;
    var kampung = req.body.kampung;
    var desa = req.body.desa;
    var kecamatan = req.body.kecamatan;
    var pesan = req.body.pesan;
    var kesan = req.body.kesan;
    var foto1 = req.body.foto1;
    var foto2 = req.body.foto2;
    var foto3 = req.body.foto3;
    var foto4 = req.body.foto4;
    var foto5 = req.body.foto5;
    var foto6 = req.body.foto6;
    var sql = "update siswa set nama=? ,no_hp=? ,kampung=? ,desa=? ,kecamatan=? ,pesan=? ,kesan=?, foto1=?, foto2=?, foto3=?, foto4=?, foto5=?, foto6=? where id=?";
    conn.query(sql,[nama, no_hp, kampung, desa, kecamatan, pesan, kesan, foto1, foto2, foto3, foto4, foto5, foto6 , id],function(error,rows){
        if(error){
            res.send(404).json({
                pesan : 'tidak mendapat update'
            });
        }
        res.json({
            pesan : "berhasil update"
        });
        console.log(rows);
    });
})

module.exports = app;