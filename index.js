const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const { MongoClient } = require('mongodb');


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8p3b1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(process.env.DB_USER);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ponnoCollection = client.db("dailybazarcollection").collection("ponnoavailable");
  // perform actions on the collection object
  console.log('database connected')
  app.get('/', (req, res) => {
    res.send('Get method is activated...')
  })

  app.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    ponnoCollection.insertOne(newProduct)
    .then(result=>{
      res.send( result)
      console.log(newProduct);
    })
   
  })
});



app.listen(process.env.PORT || 4000);