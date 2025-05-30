const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser")

const mongoDb = require("./database/connect");

const app = express();



const PORT = process.env.PORT || 8080;

// Body Parsing
app.use(express.json());

// Router
app.use("/", router);


process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);y
});

mongoDb.initializeDb((error) => {
    if(error) {
        console.log(error)
    }else {
        app.listen(PORT, () => {
        console.log(`Server is Running and listening on : http://localhost:${PORT}`);
        });
    };
});
