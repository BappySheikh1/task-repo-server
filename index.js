const express = require('express');
const cors = require('cors');
const app =express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())




const uri = process.env.USER_COLLECTION;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
      const userCollection = client.db('taskUser').collection('user')
      app.get('/users',async (req,res)=>{
        const query ={}
        const result =await userCollection.find(query).toArray()

          res.send(result)
        
      })
      
      app.post('/users',async(req,res)=>{
        const user =req.body
        // console.log(user);
          const result =await userCollection.insertOne(user)
          res.send(result)
      })
      app.delete('/user/:id',async (req,res)=>{
         const id =req.params.id
         const query ={_id : ObjectId(id)}
         const result = await userCollection.deleteOne(query)
         res.send(result)
      })


    }
    finally{

    }
}
run().catch(er => console.log(er))

app.get('/', (req,res)=>{
    res.send('task repo start')
})

app.listen(port , ()=>{
    console.log(`task repo running port ${port}`);
})