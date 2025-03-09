import React from 'react';
import { Badge, Button, Dropdown, Layout, Space } from 'antd';
import { SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
  const handleClick = (val) => {
    navigate(val);
  };

  const items = [
    {
      key: '1',
      label: (
        <span onClick={() => handleClick('/products/cart')} style={{ cursor: 'pointer' }}>
          Cart
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={() => handleClick('/products/orders')} style={{ cursor: 'pointer' }}>
          Orders History
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Header className='header'>
        <h1
          style={{ color: 'white', cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        >
          E Commerce
        </h1>
        <div className='layout'>
          <Space direction='vertical'>
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement='bottomLeft'
              >
                <Badge count={data ? data.length : 0} showZero>
                  <Button>
                    <ShoppingCartOutlined />
                  </Button>
                </Badge>
              </Dropdown>
            </Space>
          </Space>
          <Button>
            <SettingOutlined />
          </Button>
        </div>
      </Header>
      <Content
        style={{
          padding: '20px',
        }}
      >
        <div
          style={{
            margin: '20px',
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
export default AppLayout;
