import React, { Component } from 'react'
import { fetchRecipe, deleteRecipe } from '../actions/recipeActions'
import { Card, Col, Row, Icon } from 'antd'
import { connect } from 'react-redux'
import Gap from './Gap'
import { Link } from 'react-router-dom'

class RecipeList extends Component {
  componentWillMount = props => {
    this.props.fetchRecipe('https://quiet-citadel-22666.herokuapp.com/recipes/')
  }

  deleteCall = (e, idx) => {
    const id = e.target.id
    this.props.deleteRecipe(id, idx)
  }

  render() {
    const { recipes } = this.props
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={8} style={{ cursor: 'default' }}>
          {recipes.map((recipe, idx) => {
            return (
              <Col span={8} key={recipe.id}>
                <Gap />

                <Card
                  style={{
                    width: 300,
                    height: 260,
                    lineHeight: 1.5,
                    fontSize: 14
                  }}
                  bodyStyle={{ padding: 2 }}
                >
                  <Link to={`/recipelist/${recipe.id}`}>
                    <div className="custom-image">
                      <img
                        alt="example"
                        width="100%"
                        height="225"
                        src={recipe.image}
                      />
                    </div>
                  </Link>
                  <div
                    style={{ display: 'inline-block' }}
                    className="custom-card"
                  >
                    <h3>
                      {recipe.recipename}{' '}
                    </h3>
                  </div>
                  <Icon
                    id={recipe.id}
                    onClick={e => this.deleteCall(e, idx)}
                    style={{
                      cursor: 'pointer',
                      fontSize: 20,
                      float: 'right',
                      paddingRight: 7
                    }}
                    type="delete"
                  />
                  <Icon
                    id={recipe.id}
                    style={{
                      cursor: 'pointer',
                      fontSize: 20,
                      float: 'right',
                      paddingRight: 7
                    }}
                    type="edit"
                  />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipe
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecipe: url => dispatch(fetchRecipe(url)),
    deleteRecipe: (id, idx) => dispatch(deleteRecipe(id, idx))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
