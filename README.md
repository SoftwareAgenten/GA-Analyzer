# GA-Analyzer

A node.js based analyzer for [Great-Attractor](https://github.com/SoftwareAgenten/Great-Attractor) data archives.

## Usage

Load the GA-Analyzer into the node REPL by running `node` and executing the following command.

```node
> let GA = require('./analyzer.js')
undefined
```

Then, create a variable for your context.

```node
> let ctx = null
undefined
```

Load a GA data archive by calling `GA.loadData([path], callback)`. The path must point to the data folder of the GA-system. If `path` is not specified, `"data"` will be used.

The callback function should catch the passed value and assign it to the context. After having loaded all files, an `Invoked Callback` message will appear.

```node
> GA.loadData(x => ctx = x)
undefined
Loading files...
Invoked Callback
```

The context own two properties, `formData : Array`, and `requests : Object`. The IDs of the requests are used as keys on the `requests` property.