'use strict'

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

module.exports.Request = Request