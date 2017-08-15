import React, { Component } from 'react';
import { fetchRecipe } from '../actions/recipeActions';
import { Card, Col, Row, Icon } from 'antd';
import { connect } from 'react-redux';
import  Gap from './Gap'
import { Link } from 'react-router-dom'

function handleResponse(response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(json)
      }
    })
}

class RecipeList extends Component {

    componentWillMount = (props) => {
      this.props.fetchRecipe('https://quiet-citadel-22666.herokuapp.com/recipes/');
    }

    deleteRecipe = (e) => {
      const id = e.target.id
      console.log(id)
      fetch(`https://quiet-citadel-22666.herokuapp.com/recipes/${id}`, {
          method: 'DELETE',
    })
    .then(handleResponse)
    .then(data => console.log(data))
    .catch(error => console.log(error))

    }

    render() {
      const {recipes} = this.props;
      return(

        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={8} style={{cursor:'default'}}>
              {recipes.map(recipe=>
                <Col span={8} key={recipe.id}>
                  <Gap />

                  <Card style={{ width: 300, height: 260, lineHeight:1.5, fontSize: 14 }} bodyStyle={{ padding: 2 }}>
                    <Link to={`/recipelist/${recipe.id}`}>
                      <div className="custom-image">
                        <img alt="example" width="100%" height="225" src={recipe.image} />
                      </div>
                    </Link>
                      <div style={{display:'inline-block'}} className="custom-card" >
                        <h3>{recipe.recipename} </h3>
                      </div>
                    <Icon id={recipe.id} onClick={this.deleteRecipe} style={{cursor:'pointer', fontSize:20, float:'right', paddingRight: 7}} type="delete" />
                    <Icon id={recipe.id} style={{cursor:'pointer', fontSize:300, float:'right', paddingRight:7}} type="edit" />

                  </Card>
              </Col>
              )}
          </Row>
        </div>

      );
    }

}

function mapStateToProps(state) {
  return {
    recipes: state.recipe,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecipe: (url) => dispatch(fetchRecipe(url)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList)
