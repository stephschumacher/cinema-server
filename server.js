var mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();



// make a connection
mongoose.connect('mongodb://localhost:27017/cinema',{useNewUrlParser: true, useUnifiedTopology: true});
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'Connection error:'));
 

var ScheduleSchema = mongoose.Schema({
  cinemaTimesId: String,
  movie: String,
  times: [[String]]
});

var OpeningSchema = mongoose.Schema({
  id: Number,
  day: String, 
});

var SubscribersSchema = mongoose.Schema({
  //subscriberId: String,
  title: String,
  firstName: String,
  lastName: String,
  email: String,
  dob: String,
  phoneNumber: String,
  sex : String,
});

collection = mongoose.model('schedule', ScheduleSchema, 'schedule');
collectionb = mongoose.model('opening', OpeningSchema, 'opening');
collectionc = mongoose.model('subscribers', SubscribersSchema, 'subscribers');


app.get(`/opening`, async (req, res) => {
  let result = await collectionb.find();
  console.log(result);
  return res.status(200).send(result);
});


app.get(`/schedule`, async (req, res) => {
  let result = await collection.find();
  console.log(result);
  return res.status(200).send(result);
});

app.get(`/subscribers`, async (req, res) => {
  let result = await collectionc.find();
  console.log(result);
  return res.status(200).send(result);
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())



app.post('/subscribers', async (req, res) => {
  console.log("POST "+req.body.subscriberId+", "+req.body.title+", "+req.body.firstName+","
  +req.body.lastName+","+req.body.email+","+req.body.dob+","+req.body.phoneNumber+","+req.body.sex);
  let subscribers = await collectionc.create(req.body);
  return res.status(201).send({error: false,subscribers})
})



app.delete('/subscribers', async (req, res) => {
  console.log("POST "+req.body.subscriberId+", "+req.body.title+", "+req.body.firstName+","
  +req.body.lastName+","+req.body.email+","+req.body.dob+","+req.body.phoneNumber+","+req.body.sex);
  let subscribers = await collectionc.create(req.body);
  return res.status(201).send({error: false,subscribers})
})


app.listen(5000, () => {
  console.log('Server running on port 5000')
});
