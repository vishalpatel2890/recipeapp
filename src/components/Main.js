import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Recipes from './Recipes'
// import Home from '.components/Home'
import AddRecipe from './AddRecipe'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          {/* <Route exact path='/' component={Home}/> */}
          <Route path="/recipelist" component={Recipes} />
          <Route path="/addrecipe" component={AddRecipe} />
        </Switch>
      </main>
    )
  }
}

export default Main
