'use strict'

let fs = require('fs-promise')

class Request {
  constructor(id, filename, datetime, url, pageName, ipAddress, headers, userId, previousRequestIds, countryCode, regionCode) {
    this.id = id
    this.filename = filename
    this.datetime = new Date(datetime)
    this.url = url
    this.pageName = pageName
    this.ipAddress = ipAddress
    this.headers = headers
    this.userId = userId
    this.previousRequestIds = previousRequestIds
    this.countryCode = countryCode
    this.regionCode = regionCode
  }
}

class FormData {
  constructor(postData, request) {
    this.post = postData
    this.request = request
  }
}

let loadFiles = filepaths => {
  return Promise.all(filepaths.map(x => fs.readFile(x)))
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