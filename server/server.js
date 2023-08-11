// const express = require("express")
import express from "express"
import mysql from 'mysql'
import cros from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json())
app.use(cros())

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})


app.get("/allproducts",(req,res)=>{
  const q = "SELECT * from CMS.products"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/product/:id", (req,res)=>{
  const productId = req.params.id
  const q = `SELECT * from CMS.products where product_id = ${productId}`
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

const PORT = 8080
app.listen(PORT)