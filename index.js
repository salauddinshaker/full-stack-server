const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 4200

app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8p3b1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(process.env.DB_USER);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ponnoCollection = client.db("dailybazarcollection").collection("ponnoavailable");
  // perform actions on the collection object
  console.log('database connected')
  app.get('/', (req, res) => {
    res.send('OIYeeeeh..........')
  })

  app.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    ponnoCollection.insertOne(newProduct);
    console.log('new product added ....', ponnoCollection)
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})