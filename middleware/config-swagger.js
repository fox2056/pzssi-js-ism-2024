const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("../swagger-output.json")

const configureSwagger = (app) => {
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

module.exports = configureSwagger
