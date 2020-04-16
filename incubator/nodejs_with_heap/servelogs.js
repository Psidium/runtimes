const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const glob = require("glob");

const helper = require('./lib/helper');

const funcPort = Number(process.env.FUNC_PORT || "8080");
const bodySizeLimit = Number(process.env.REQ_MB_LIMIT || "1");
const app = express();
app.use(morgan("combined"));
const bodParserOptions = {
  type: req => !req.is("multipart/*"),
  limit: `${bodySizeLimit}mb`
};
app.use(bodyParser.raw(bodParserOptions));
app.use(bodyParser.json({ limit: `${bodySizeLimit}mb` }));
app.use(bodyParser.urlencoded({ limit: `${bodySizeLimit}mb`, extended: true }));

app.get("/log/:logName", (req, res) => {
  const { logName } = req.params;
  res.sendFile(logName, { root: __dirname });
});

app.get("/get_log_names", (req, res) => {
  // tenta escrever um arquivo qqlr e da ero se n conseguir
   glob("*(*.heapprofile|*.log*|.cpuprofile)", (err, logs) => {
     if (!err) {
       res.json(logs);
     } else {
       res.status(500).send(err);
     }
   });
});

app.get("/restart", (req, res) => {
  res.status(200).send('Restarting');
  console.log("Restarting down the server!");
  process.exit(0);
});

helper.routeLivenessProbe(app);

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    // CORS preflight support (Allow any method or header requested)
    res.header(
      "Access-Control-Allow-Methods",
      req.headers["access-control-request-method"]
    );
    res.header(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"]
    );
    res.end();
  } else {
  }
  return next();
});

console.log("ready")
app.listen(funcPort);

