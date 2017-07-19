/**
 * Created by Administrator on 2017/7/19 0019.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  /*
  * location.pathname 就是/home  /users   /
  * */
  render() {
    const {location} = this.props; //从外面传递进来的this.props.location，selectedKeys代表默认在key数组
    return (<div>
      <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
        <Menu.Item key="/users">
          <Link to="/users"><Icon type="bars"/>Users</Link>
        </Menu.Item>
        <Menu.Item key="/">
          <Link to="/"><Icon type="home"/>Home</Link>
        </Menu.Item>
        <Menu.Item key="/404">
          <Link to="/page-you-dont-know"><Icon type="frown-circle"/>404</Link>
        </Menu.Item>
        <Menu.Item key="/antd">
          <a href="https://github.com/dvajs/dva" target="_blank">dva</a>
        </Menu.Item>
      </Menu>
    </div>)
  }
};
