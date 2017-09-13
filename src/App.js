import React, { Component } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { Row } from 'antd'
import './App.css'

class App extends Component {
  render() {
    return (
      <Row>
        <div>
          <Header />
        </div>

        <div>
          <Main />
        </div>
      </Row>
    )
  }
}

export default App
