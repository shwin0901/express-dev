const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path');
const webpack = require('webpack')
const webpackMiddleWare = require('webpack-dev-middleware')
const config = require('./webpack.config.js')

const port = '8888'
const compiler = webpack(config)

// app.use(express.json())

app.use(
  webpackMiddleWare(compiler, {
    publicPath: config.output.publicPath
  })
)

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})



app.listen(port, () => {
  console.log("Server running on port ", port)
})