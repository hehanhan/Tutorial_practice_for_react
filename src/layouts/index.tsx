import React from 'react';
import styles from './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

const { Header, Content, Footer } = Layout;

const menuData = [
  { route: 'hero', name: 'Heros' },
  { route: 'item', name: 'Items' },
  { route: 'summoner', name: 'Summoners' },
];

function BasicLayout(props: any) {
  const {
    location: { pathname },
    children,
  } = props;

  return (
    <Layout>
      <Header>
        <div className={styles.logo}>King of Glory</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '64px' }}
        >
          {menuData.map((menu) => (
            <Menu.Item key={`/${menu.route}`}>
              <Link to={menu.route}>{menu.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: '100vh' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Beginner Tutorial Create By Lin
      </Footer>
    </Layout>
  );
}

export default BasicLayout;
