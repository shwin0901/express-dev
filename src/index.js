import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter, Routes } from 'react-router-dom'
import RouteElement from './routes'
import "antd/dist/antd.less";

import "./mobx/observable"

function add(x, y) {
  return x * y
}

console.log(add(22, 9))

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <RouteElement />
  </BrowserRouter>
)