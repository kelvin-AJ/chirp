const express = require("express");
const router = require("./routes")
const app = express();
const PORT = process.env.PORT || 8080;

// Router
app.use("/", router)



app.listen(PORT, () => {
    console.log(`Server is Running and listening on : http://localhost:${PORT}`)
})