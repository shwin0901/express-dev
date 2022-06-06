const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path');
const port = '8888'

app.use(express.json())

app.get('/a', (req, res) => {
  res.sendFile(path.resolve(__dirname, './a.html'))
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './public/index.html'))
})



app.listen(port, () => {
  console.log("Server running on port ", port)
})