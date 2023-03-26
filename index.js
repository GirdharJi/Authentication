const express = require('express');
const app = express();
const auth = require("./routes/authRoutes");
const createDB = require("./config/db");

const PORT = 3326;

createDB.sync().then(()=>{
    console.log("DB connected successfully");
})

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", auth)

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})