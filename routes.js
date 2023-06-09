const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');


//Routes that refer to templates.
router.get('/', (req, res) => {
    res.render('index')
})


router.get('/police', (req, res) => {
    res.render('police')
})


router.get('/police-clarendon', (req, res) => {
    res.render('police-clarendon')
})



router.get('/012546', (req, res) => {
    res.render('012546')
})


const connectionString = "mongodb+srv://engineadmin:SbRIGpMAAEilBqcN@cluster0.2ce1dc9.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString);

const HealthData = mongoose.model("HealthData", {
    temperature: Number,
    heartrate: Number,
    humidity: Number,
    lat: Number,
    lng: Number, 
    dateTime: Date
});

let date = Date.now();

router.post('/api/send', (req, res) => {
   
    var hd = new HealthData({
        temperature: req.body.temperature,
        heartrate:req.body.heartrate,
        humidity: req.body.humidity,
        lat: req.body.lat,
        lng: req.body.lng,
        dateTime: Date.now()
    });

    
    //Save the JSON object to the MongoDB database. 
    hd.save().then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    });
})

//Fetch the latest record in the DB and return it in JSON format. 
router.get('/api/fetch',  cors(), async (req, res) => {
    try {
      const latestDocument = await HealthData.findOne().sort({ dateTime: -1 }).exec();
  
      if (!latestDocument) {
        return res.status(404).json({ message: 'No documents found' });
      }
      res.header('Access-Control-Allow-Credentials', true);
      res.json(latestDocument);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });



module.exports = router;