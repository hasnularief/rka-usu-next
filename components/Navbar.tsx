import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
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

const Navbar = (props: any) => {
  const [current, setCurrent] = useState('rka');
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const { state } = props;
    if (state) {
      setCurrent(state);
    }
  }, [props]);

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
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
};

export default Navbar;
