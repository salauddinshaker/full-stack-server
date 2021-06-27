const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8p3b1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()
const port = 4200


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("dailybazarcollection").collection("ponnoavailable");
  // perform actions on the collection object
  console.log('database connected')
  app.get('/', (req, res)=>{
      res.send('OIYeeeeh..........')
  })
});


app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})