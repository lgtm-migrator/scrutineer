var app = require('../app.js')
var Station = require('../models/station.js')
var Council = require('../models/council.js')

app.get('/station/:council/:station.json', function (req, res) {
  Station.find({
    council_id: req.params.council,
    station_id: req.params.station
  }, function (err, station) {
    if (err) next(err)
    res.json(station)
  })
})

app.get('/station/:council/:station', function (req, res, next) {
  Station.find({
    council_id: req.params.council,
    station_id: req.params.station
  }, function (err, station) {
    if (err) next(err)
    Council.find({council_id: req.params.council}, function (err2, council) {
      if (err2) next(err2)
      res.render('station.pug', {
        station: station[0],
        council: council[0],
        welsh: req.params.council.startsWith('W')
      })
    })
  })
})

app.get('/station', function (req, res, next) {
  res.render('inspection.pug')
})