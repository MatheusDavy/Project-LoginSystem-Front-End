const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt")
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: '',
    database: "loginsystemreactstudy"

})

//Req = pegamos os dados do front 
//Res = enviamos os dados para o back
app.use(express.json())
app.use(cors())
app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name
    const last_name = req.body.last_name
  
    db.query("SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if(err) {
        result.send(err);
      }  
      if (result.length == 0) {
        bcrypt.hash(password, saltRounds, (error, hash)=>{  //Criar senha criptografada
            db.query(
                "INSERT INTO users (first_name, last_name, email, password) VALUE (?, ?, ?, ?)",
                [first_name, last_name, email, hash], (error, response) => {
                 if(error){
                    res.send(error)
                 }
                 res.send({ 
                  msg: "Usuário cadastrado com sucesso",
                  isSucess: true,
                });
                }
              );
        })
      } else {
        res.send({ 
          msg: "Email já cadastrado",
          isSucess: false,
      });
      }
    });
  });


  app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if(err) {
        result.send(err);
      }  
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, result) =>{
            if(result) res.send({
              msg: "Usuário logado com sucesso",
              isSucess: true,
          })
            else res.send({
              msg: "Usuário ou senha incorretas",
              isSucess: false,
          })
        })
      } else {
        res.send({ 
          msg: "Usuários ou senha incorretas",
          isSucess: false, 
        });
      }
    });
  });
  
   

app.listen(3001, ()=>{
    console.log('rodando na porta 3001')
})        