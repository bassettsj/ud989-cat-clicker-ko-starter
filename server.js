var express = require('express')
var jsonServer = require('json-server')
var Chance = require('chance')

var chance = new Chance()
var app = jsonServer.create()

var data = {
  cats: generateData(1000)
}

var router = jsonServer.router(data)

app.use(express.static(__dirname))
app.use(jsonServer.defaults.splice(1, 1))
app.use(router)

app.listen(8080)

function generateData (number) {
  number = number || 100
  var cats = []
  var w, h

  function getNickNames () {
    var nickNames = []
    var num = chance.natural({min: 0, max: 10})
    for (var i = 0; i < num; i++) {
      nickNames.push(chance.first())
    }
    return nickNames
  }
  for (var i = 0; i < number; i++) {
    w = chance.natural({min: 200, max: 300})
    h = chance.natural({min: 200, max: 300})

    cats.push({
      name: chance.name(),
      imgSrc: 'https://placekitten.com/g/' + w + '/' + h,
      imgAttr: 'https://placekitten.com/attribution.html',
      nickNames: getNickNames()
    })
  }
  return cats
}
