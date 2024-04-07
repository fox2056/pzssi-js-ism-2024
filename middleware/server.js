const { json, urlencoded } = require("express")
const cors = require("cors")
const methodOverride = require("method-override")

const configureServer = (app) => {
  app.use(cors())
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(methodOverride("_method"))
  return app
}

module.exports = configureServer
