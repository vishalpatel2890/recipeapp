import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import RecipeList from './RecipeList'
import RecipeDetails from './RecipeDetails'

class Recipe extends Component {
  render(){
    return(
      <main>
        <Switch>

          <Route exact path='/recipelist' component={RecipeList}/>
          <Route path='/recipelist/:recipeid' component={RecipeDetails}/>
        </Switch>
      </main>
    );
  }
}

export default Recipe
