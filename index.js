const express = require("express");
const app = express()
const db = require("./Mongodb")
const bcrypt =require('bcrypt')
const upload =require('./multer')
const cors = require('cors')
const { ObjectID } = require("mongodb")
const jwt = require('jsonwebtoken');

const admin={email:'Admin',pass:'123'}

require('dotenv').config()

app.use(express.static('img'))
app.use(express.json())
app.use(cors())

db.connect((err) => {
  if (err) {
    console.log("connection failed" + err);
  } else {
    console.log("db connected");
  }
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

app.get("/user/:id",authenticateToken,(req, res) => {
  db.get().collection('users').findOne({_id:ObjectID(req.params.id)}).then((response)=>{
    res.json(response)
  })
});

app.post('/login',async(req,res)=>{
  let user =await db.get().collection('users').findOne({email:req.body.email})
  if(user){
    bcrypt.compare(req.body.password,user.password).then((status)=>{
      if(status) {
        let accessToken=jwt.sign({user},process.env.ACESS_TOKEN_SCERET,{expiresIn: '10m'})
        let refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
        res.cookie('jwt', refreshToken, { httpOnly: true,secure: true, 
          maxAge: 24 * 60 * 60 * 1000 });
        res.json({accessToken:accessToken,user:user,refreshToken:refreshToken})
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

app.post('/upload/:id',upload.single('image'),(req,res)=>{
  const url = req.protocol + '://' + req.get('host')
  const Img= url + '/' + req.file.filename
  try {
    db.get().collection('users').updateOne({_id:ObjectID(req.params.id)},{$set:{img:Img}})

      res.json(Img)
  } catch (err) {
    res.sendStatus(400)
 }
})

app.put('/edituser',(req,res)=>{
  db.get().collection('users').updateOne({_id:ObjectID(req.body.id)},{
    $set:{
      name:req.body.name,
      email:req.body.email
    }
  }).then(()=>{
    res.sendStatus(200)
  })
})

app.listen(3001, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running");
  }
});
