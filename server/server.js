const express = require("express")
const cors = require("cors")
const app = express()

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

app.get("/data",(req,res)=>{
    res.json({name: "James", favorite: "fishing"})
})

const PORT = 5001
app.listen(PORT)