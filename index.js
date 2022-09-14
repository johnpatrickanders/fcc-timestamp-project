// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", async function (req, res) {
  let date = false;
  if(!req.params.date) date = new Date();
  try {
    if(Number(req.params.date)){
      date = new Date(Number(req.params.date));
    }
  } catch (error) {
    res.json({ error : "Invalid Date" })
    return
  }
  if(!date) date = new Date(req.params.date);
  const unix_date_ms = date.getTime();
  const standard_date = date.toUTCString();
  if(standard_date === 'Invalid Date'){
    res.json({ error : "Invalid Date" })
  } else {
    res.json({unix: unix_date_ms, utc: standard_date});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
