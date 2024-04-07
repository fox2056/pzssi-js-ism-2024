const { createHandler } = require("graphql-http/lib/use/http")
const { ruruHTML } = require("ruru/server")

const configureGraphQL = (app) => {
  try {
    const schema = require("./schema")

    if (!schema) {
      throw new Error("GraphQL schema is not defined")
    }

    const handler = createHandler({ schema })
    app.use("/graphql", handler)

    app.get("/ide", (_req, res) => {
      res.type("html")
      res.end(ruruHTML({ endpoint: "/graphql" }))
    })
  } catch (err) {
    console.error("Error configuring GraphQL:", err)
  }
}

module.exports = configureGraphQL
