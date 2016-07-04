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

class Context {
  constructor(formData, requests) {
    this.formData = formData
    this.requests = requests
  }
}

let loadFiles = filepaths => {
  return Promise.all(filepaths.map(x => fs.readFile(x)))
}

let loadData = (path, callback) => {
  if (typeof path === 'function') {
    callback = path
    path = 'data'
  }
  
  Promise.all([
    fs.readdir(`${path}/form_data`),
    fs.readdir(`${path}/requests`),
  ]).then(files => {
    const formDataFilepaths = files[0].map(x => `${path}/form_data/${x}`)
    const requestFilepaths = files[1].map(x => `${path}/requests/${x}`)
    
    console.log('Loading files...')
    
    Promise.all([
      loadFiles(formDataFilepaths),
      loadFiles(requestFilepaths)
    ]).then(contents => {
      const formDataJSON = contents[0].map(x => JSON.parse(x))
      const requestsJSON = contents[1].map(x => JSON.parse(x))
      
      const requests = requestsJSON.map(x => 
        new Request(
          x.id,
          x.filename,
          x.time,
          x.url,
          x.pageName,
          x.ipAddress,
          x.headers,
          x.userId,
          x.previousRequestIds,
          x.geo.countryCode,
          x.geo.regionCode
        ))
      const requestsDict = requests.reduce((o, x) => {
        o[x.id] = x
        return o
      }, {})
      const formData = formDataJSON.map(x => (new FormData(
        x.post,
        requestsDict[x.requestId]
      )))
      const context = new Context(formData, requests)
      
      callback(context)
      
      console.log('Invoked Callback')
    }).catch(error => console.log(error))
  }).catch(error => console.log(error))
}

let count = list => {
  var array = []
  
	list.forEach(x => {
		var i = array.findIndex(e => e.name === x)
		if (i !== -1) {
			array[i].count += 1
		} else {
			array.push({ name: x, count: 1 })
		}
	})
  
	return array.sort((x, y) => y.count - x.count)
}

// classes
module.exports.Request = Request
module.exports.FormData = FormData
module.exports.Context = Context

// methods
module.exports.loadData = loadData
module.exports.count = count