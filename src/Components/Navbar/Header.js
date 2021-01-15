import React, { useState } from "react";
import { Menu } from "antd";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

const { SubMenu, Item } = Menu;

const Header = () => {
  // State Initialization
  const [current, setCurrent] = useState("home");

  // Use Functions
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Item key="home" icon={<HomeOutlined />} className="calibrate">
        <Link className="align" to="/">Home</Link>
      </Item>
      {user && (
        <SubMenu
          className="calibrate"
          title={user.email && user.email.split("@")[0]}
          icon={<UserOutlined />}
        >
          <Item key="this">
            <Link to="/">Option 1</Link>
          </Item>
          <Item key="that">
            <Link to="/">Option 1</Link>
          </Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            <Link to="/" className="align">Logout</Link>
          </Item>
        </SubMenu>
      )}
      {!user && (
        <Item key="register" className="calibrate" icon={<UserAddOutlined />}>
          <Link to="/register" className="align" >Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="calibrate">
          <Link to="/login" className="align">Login</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
