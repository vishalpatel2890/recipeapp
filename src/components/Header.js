import { Menu, Icon, Modal, Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AddRecipe from './AddRecipe'

class Header extends Component {
  state = {
    current: 'app',
    visible: false
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  showModal = () => {

    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >

        <Menu.Item key="app">
          <Icon type="appstore" />Recipe List<Link to='/recipelist'/>
        </Menu.Item>
        <Menu.Item key="alipay" >
          <div onClick={this.showModal}><Icon type="plus-square" />Add Recipe</div>
          <Modal
            title="Add Recipe"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>Cancel</Button>,
          ]}
          >
            <AddRecipe handleOk={this.handleOk}/>
          </Modal>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header
