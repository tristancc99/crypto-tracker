const express = require("express")
const path = require("path")
const db = require("./db")

const app = express()

app.use("/dist", express.static(path.join(__dirname, "dist")))

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

const port = process.env.PORT || 3000

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})
