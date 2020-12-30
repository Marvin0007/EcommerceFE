import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from 'react-router-dom';


const { SubMenu, Item } = Menu;


const Header = () => {

  const [current, setCurrent] = useState("home");
  const handleClick = (e) => { 
    setCurrent(e.key);
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key='home' icon={<HomeOutlined />}>
        <Link to='/'>Home</Link>
      </Item>
      <SubMenu
        title="Profile" icon={<UserOutlined />} 
      >
        <Item key="this"><Link to='/'>Option 1</Link></Item>
        <Item key="that"><Link to='/'>Option 1</Link></Item>
      </SubMenu>
      <Item key='register' icon={<UserAddOutlined />} className="float-*-right">
        <Link to='/register'>Register</Link>
      </Item>
      <Item key='login' icon={<LoginOutlined />} className="float-*-right">
        <Link to='/login'>Login</Link>
      </Item>
    </Menu>
  );
};

export default Header;
