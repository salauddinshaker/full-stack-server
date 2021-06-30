const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()



app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8p3b1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(process.env.DB_USER);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ponnoCollection = client.db("dailybazarcollection").collection("ponnoavailable");
  const orderCollection = client.db("dailybazarcollection").collection("orders");
  // perform actions on the collection object
  console.log('database connected')
  app.get('/', (req, res) => {
    res.send('Get method is activated...')
  })

  app.get('/productCollection',(req, res)=>{
    ponnoCollection.find()
    .toArray((err, ponno)=>{
      res.send(ponno);
    })
  })

  app.get('/ordersCollection',(req, res)=>{
    orderCollection.find()
    .toArray((err, ponno)=>{
      res.send(ponno);
    })
  })

  app.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    ponnoCollection.insertOne(newProduct)
    .then(result=>{
      res.send( result)
      console.log(newProduct);
    })
  })



  app.delete('/deleteProduct', (req, res)=>{
    const id = ObjectId(req.params.id);
    console.log('delete this',id)
    ponnoCollection.deleteOne({_id:id})
    .then(documents => res.send(documents));
  })

  app.post('/addOrder', (req, res) => {
    const orderAdded = req.body;
    orderCollection.insertOne(orderAdded)
    .then(result=>{
      res.send( result)
      console.log(orderAdded);
    })
  })

});



app.listen(process.env.PORT || 4000);