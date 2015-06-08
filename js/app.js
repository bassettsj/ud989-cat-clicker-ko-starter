/* global ko, fetch */

(function (window) {
  'use strict'

  function CatModel (name, imgSrc, imgAttr, nickNames) {
    this.name = ko.observable(name)
    this.clicks = ko.observable(0)
    this.imgSrc = ko.observable(imgSrc)
    this.imgAttr = ko.observable(imgAttr)
    this.imgAlt = ko.computed(function () {
      return 'picture of ' + this.name()
    }, this)
    this.level = ko.computed(function () {
      var clicks = this.clicks()
      if (clicks > 101) {
        return 'Senior'
      } else if (clicks > 41) {
        return 'Over-The-Hill'
      } else if (clicks > 31) {
        return 'Adult'
      } else if (clicks > 21) {
        return 'Young Adult'
      } else if (clicks > 11) {
        return 'Teen'
      } else if (clicks > 3) {
        return 'Kitten'
      } else {
        return 'Infant'
      }
    }, this)
    this.nickNames = ko.observableArray(nickNames)
    this.incrementClicks = function () {
      this.clicks(this.clicks() + 1)
    }.bind(this)
  }

  function CatCollection (cats) {
    var self = this;
    this.cats = ko.observableArray(cats.map(function (cat) {
      return new CatModel(cat.name, cat.imgSrc, cat.imgAttr, cat.nickNames)
    }))
    var first = this.cats()[0]
    this.selected = ko.observable(first)
    this.select = function (cat) {
      this.selected(cat)
    }.bind(this)
    this.isSelected = function (index) {
      return self.cats.indexOf(self.selected()) === index()
    }
  }



  fetch('/cats')
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {

      try {
        ko.applyBindings(new CatCollection(data))
      } catch (e) {
        return e
      }
    })
    .catch(console.error)
})(window)
