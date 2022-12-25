const express = require("express");
const app = express()
const db = require("./Mongodb")
const bcrypt =require('bcrypt')
require('dotenv').config()

app.use(express.json())
const cors = require('cors')
var jwt = require('jsonwebtoken');
app.use(cors())

const admin={email:'Admin',pass:'123'}

db.connect((err) => {
  if (err) {
    console.log("connection failed" + err);
  } else {
    console.log("db connected");
  }
});

app.get("/user", authenticateToken,(req, res) => {
    // db.get().collection('users').insertOne({helo:"hi"})/
    // res.status(300).json({ hello: "hasfhkj" });
    res.status(200)
});

app.post('/login',async(req,res)=>{
  let user =await db.get().collection('users').findOne({email:req.body.email})
  if(user){
    bcrypt.compare(req.body.password,user.password).then((status)=>{
      if(status) {
        let accessToken=jwt.sign(user.name,process.env.ACESS_TOKEN_SCERET)
        res.status(200).json({accessToken:accessToken})
      }
      else res.status(401).json({error:'Invalid password'})
    })
  }else{
    res.sendStatus(404)
  }
})

app.post('/signup',async(req,res)=>{
  console.log('data');
  req.body.password= await bcrypt.hash(req.body.password, 10)
  db.get().collection('users').insertOne(req.body).then(()=>{
    res.status(200).json()
  })
})

app.post('/admin',(req,res)=>{
    const {email,password} =req.body;
    if(email==admin.email&&password==admin.pass){
        res.status(200).json({login:"sucess"})
    }else{
        if(email!==admin.email){
            res.status(401).json({error:'Invalid Email'})
        }else{
            res.status(401).json({error:'wrong password'})
        }
    }
})

function authenticateToken(req,res,next){
  const authHeader=req.headers['authorization']
  const token=authHeader && authHeader.split(' ')[1]
  if(token==null) return res.sendStatus(401)
  jwt.verify(token,process.env.ACESS_TOKEN_SCERET,(err,user)=>{
    if(err) return res.sendStatus(403)
    next()
  })
}
app.listen(3001, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running");
  }
});
