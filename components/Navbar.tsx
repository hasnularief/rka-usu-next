import type { NextPage } from 'next';
import React from 'react';
import { Menu } from 'antd';
import {
  UnorderedListOutlined,
  BarChartOutlined,
  CalendarOutlined,
  EyeOutlined,
  CopyOutlined,
  SettingOutlined,
  InfoCircleFilled,
} from '@ant-design/icons';

const { SubMenu } = Menu;

class Navbar extends React.Component {
  state = {
    current: 'rka',
  };

  handleClick = (e: any) => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="rka" icon={<UnorderedListOutlined />}>
          RKA
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<BarChartOutlined />} title="Kinerja">
          <Menu.Item key="kinerja:2022">RKA 2022</Menu.Item>
          <Menu.Item key="kinerja:2021S">RKA Suplemen 2021</Menu.Item>
          <Menu.Item key="kinerja:2021">RKA 2021</Menu.Item>
        </SubMenu>
        <Menu.Item key="dpa" icon={<CalendarOutlined />}>
          DPA
        </Menu.Item>
        <Menu.Item key="monev" icon={<EyeOutlined />}>
          Monev
        </Menu.Item>
        <Menu.Item key="template" icon={<CopyOutlined />}>
          Template
        </Menu.Item>
        <Menu.Item key="pengaturan" icon={<SettingOutlined />}>
          Pengaturan
        </Menu.Item>
        <Menu.Item key="tutorial" icon={<InfoCircleFilled />}>
          Tutorial
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;
