const express = require("express")
const configureServer = require("./middleware/server")
const colors = require("colors")
require("dotenv").config()
const connectDB = require("./config/db")
const bookRouter = require("./routes/bookRoutes")
const bookRouterREST = require("./routes/bookRoutesREST")
const configureGraphQL = require("./graphql/graphql")
const configureSwagger = require("./middleware/config-swagger")

const app = express()
app.set("view engine", "ejs")
connectDB()
  .then(() => configureGraphQL(app))
  .then(() => configureServer(app))
  .then(() => {
    app.use("/api/books", bookRouterREST)
    app.use("/", bookRouter)
    return configureSwagger(app)
  })
  .then(() => {
    const port = process.env.PORT || 8000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`.yellow.bold)
    })
  })
  .catch((err) => {
    console.error("Error connecting to database or configuring server:", err)
    process.exit(1)
  })
