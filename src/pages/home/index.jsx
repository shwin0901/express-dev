import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom'
import './index.less'

function Home() {
  const desc = useRef()
  const [ellipsis, setEllipsis] = useState(false)


  useEffect(() => {
    console.log("desc", desc.current.offsetHeight)

  }, [])

  const onEllipsis = () => {
    setEllipsis(!ellipsis)
  }

  return (
    <>
      <div className='container'>
        <div className='title'>
          <h3>标题</h3>
          <a onClick={onEllipsis}>{ellipsis ? '展开' : '收缩'}</a>
        </div>
        <p
          className='container-ellipsis'
          ref={desc}
          style={{
            WebkitLineClamp: ellipsis ? 3 : undefined
          }}
        >
          Webpack 提供了多种接口来自定义编译过程。 接口间存在一些重叠功能，例如配置选项可能通过 CLI 标志启用， 而其他仅存在于单个接口。 以下概念可以帮助你快速入门。
        </p>
      </div>

    </>
  )
}

export default Home