'use strict'

let fs = require('fs-promise')

class Request {
  constructor(id, filename, datetime, url, pagename, ipAddress, headers, userId, previousRequestIds, countryCode) {
    this.id = id
    this.filename = filename
    this.datetime = new Date(datetime)
    this.url = url
    this.pagename = pagename
    this.ipAddress = ipAddress
    this.headers = headers
    this.userId = userId
    this.previousRequestIds = previousRequestIds
    this.countryCode = countryCode
  }
}

class FormData {
  constructor(postData, request) {
    this.post = postData
    this.request = request
  }
}

var loadData = (path, callback) => {
  if (typeof path === 'function') {
    callback = path
    path = 'data'
  }
  
  Promise.all([
    fs.readdir(`${path}/form_data`),
    fs.readdir(`${path}/requests`),
  ]).then(files => {
    callback(files)
  }, function (error) {
    console.log(error)
  })
}

module.exports.Request = Request
module.exports.FormData = FormData
module.exports.loadData = loadData