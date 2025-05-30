const express = require("express");
const router = require("./routes");
const cors = require("cors");

const mongoDb = require("./database/connect");

const app = express();



const PORT = process.env.PORT || 8080;

// Resource sharing
const whitelist = [
  `http://localhost:${PORT}`,
  'http://localhost:3000',
  'https://chirp-w3e9.onrender.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  }
};



app.use(cors(corsOptions))
   .use(express.json())
   .use("/", router);



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
