let projectdata={};
//projectdata={};

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app=express();

const cors = require('cors');
app.use(cors());

const bodyparser =require('body-parser');
app.use(bodyparser.urlencoded({ extended:false}));
app.use (bodyparser.json());

app.use (express.static('dist'));


const port = 8888;
app.listen(port,()=>{
  console.log(` Listining on port ${port}`)
});

app.get('/',function(req,res){
  res.send("");
});

app.get('/get',(req,res)=>{
  res.send(projectdata);
});

app.post('/add',(req,res)=>{
  const result = { }
  result['destination']=req.body.destination;
  result['date']=req.body.date;
  projectdata=result;

  res.send({success:true})

});


