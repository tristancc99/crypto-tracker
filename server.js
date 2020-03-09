const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tracking/", async (req, res, next) => {
  db.getTrackees()
    .then(trackees => res.send(trackees))
    .catch(next);
});

app.post("/api/tracking/", async (req, res, next) => {
  console.log(req.body);
  try {
    db.newTrackee(req.body.id, req.body.name)
      .then(trackee => res.send(trackee))
      .catch(next);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/tracking/:id", (req, res, next) => {
  db.removeTrackee(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
