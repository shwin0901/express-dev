import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './index.less'

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  return (
    <>
      <Layout className='layout-container'>
        <Sider>
          <div className='layout-logo'></div>
          <Menu>
            <Menu.Item key='1'>
              <Link to='/'>首页</Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to='/other'>其他</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content
            className='layout-content'
          >
            <Outlet />
          </Content>
          <Footer>Express!</Footer>
        </Layout>
      </Layout>

    </>
  )
}

export default App