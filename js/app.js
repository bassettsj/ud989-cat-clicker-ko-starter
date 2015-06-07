/* global ko, fetch */

(function (window) {
  'use strict'

  function CatModel (name, imgSrc, imgAttr) {
    this.name = ko.observable(name)
    this.clicks = ko.observable(0)
    this.imgSrc = ko.observable(imgSrc)
    this.imgAttr = ko.observable(imgAttr)
    this.imgAlt = ko.computed(function () {
      return 'picture of ' + this.name()
    }, this)
    this.incrementClicks = function () {
      this.clicks(this.clicks() + 1)
    }.bind(this)
  }

  function CatCollection (cats) {
    this.cats = ko.observableArray(cats.map(function (cat) {
      return new CatModel(cat.name, cat.imgSrc, cat.imgAttr)
    }))
    var first = this.cats()[0]
    this.selected = ko.observable(first)
    this.select = function (cat) {
      this.selected(cat)
    }.bind(this)
  }



  fetch('/cats')
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {

      try {
        ko.applyBindings(new CatCollection(data))
      } catch (e) {
        debugger;
      }
    })
    .catch(console.error)
})(window)
