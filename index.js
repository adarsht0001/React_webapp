const express = require("express");
const app = express()
const db = require("./Mongodb")
const bcrypt =require('bcrypt')
require('dotenv').config()

app.use(express.json())
const cors = require('cors')
var jwt = require('jsonwebtoken');
const { ObjectId, ObjectID } = require("mongodb");
app.use(cors())

const admin={email:'Admin',pass:'123'}

db.connect((err) => {
  if (err) {
    console.log("connection failed" + err);
  } else {
    console.log("db connected");
  }
});

app.get("/user",authenticateToken,(req, res) => {
    res.status(200)
});

app.post('/login',async(req,res)=>{
  let user =await db.get().collection('users').findOne({email:req.body.email})
  if(user){
    bcrypt.compare(req.body.password,user.password).then((status)=>{
      if(status) {
        let accessToken=jwt.sign(user.name,process.env.ACESS_TOKEN_SCERET)
        res.status(200).json({accessToken:accessToken,user:user})
      }
      else res.status(401).json({error:'Invalid password'})
    })
  }else{
    res.status(404).json({error:'user Not found'})
  }
})

app.post('/signup',async(req,res)=>{
  req.body.password= await bcrypt.hash(req.body.password, 10)
  db.get().collection('users').insertOne(req.body).then(()=>{
    res.status(200).json()
  })
})

app.post('/admin',(req,res)=>{
    const {email,password} =req.body;
    if(email==admin.email&&password==admin.pass){
    let accessToken=jwt.sign(admin.email,process.env.ACESS_TOKEN_SCERET)
        res.status(200).json({login:"sucess"})
    }else{
        if(email!==admin.email){
            res.status(401).json({error:'Invalid Email'})
        }else{
            res.status(401).json({error:'wrong password'})
        }
    }
})

app.delete('/deleteuser',(req,res)=>{
  db.get().collection('users').deleteOne({_id:ObjectID(req.body.id)}).then((response)=>{
    res.sendStatus(200)
  })
})

app.get('/userlist',async(req,res)=>{
  let users=await db.get().collection('users').find().toArray()
  res.json({result:users})
})


function authenticateToken(req,res,next){
  const authHeader=req.headers['authorization']
  const token=authHeader && authHeader.split(' ')[0]
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
