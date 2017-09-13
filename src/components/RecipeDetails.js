import React, { Component } from 'react'
import '../App.css'
import { clearRedux } from '../actions/recipeActions'
import { fetchStepsIngr } from '../actions/stepsActions'
import { Tabs, Button, Row, Col, Upload, Icon, message, Checkbox } from 'antd'
import { connect } from 'react-redux'

const TabPane = Tabs.TabPane

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

class RecipeDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'left'
    }
  }

  componentWillMount = props => {
    this.props.clearRedux()
    this.setSate = {
      ingredients: null
    }
    const recipeid = parseInt(this.props.match.params.recipeid, 10)

    if (!recipeid) {
      return <div>Sorry, but the recipe was not found</div>
    }
    this.props.fetchStepsIngr(
      `https://quiet-citadel-22666.herokuapp.com/stepsearch/x/?recipeid=${recipeid}`,
      `https://quiet-citadel-22666.herokuapp.com/ingredientsearch/x/?recipeid=${recipeid}`
    )
  }

  handleModeChange = e => {
    const mode = e.target.value
    this.setState({ mode })
  }

  handleChange = info => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj)
    }
  }

  render() {
    const { mode } = this.state
    const { steps, ingredients } = this.props
    console.log(steps)
    console.log(ingredients)

    return (
      <div>
        {/* <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group> */}
        <Tabs defaultActiveKey="0" onEdit={this.onEdit} tabPosition={mode}>
          <TabPane tab="Ingredients" key="0">
            <Row gutter={8}>
              <Col span={12}>
                <ul className="ingredients-ul">
                  {ingredients.map(ingredient =>
                    <li key={ingredient.id}>
                      <Checkbox className="ingredients">
                        {ingredient.ingredient}
                      </Checkbox>
                    </li>
                  )}
                </ul>
              </Col>
              <Col span={12}>
                <Button type="primary">Button</Button>
              </Col>
            </Row>
          </TabPane>
          {steps.map((step, idx) =>
            <TabPane tab={Number(step.stepno)} key={step.stepno}>
              <Row gutter={8}>
                <Col span={12} className="steps">
                  {step.steps}
                </Col>
                <Col span={12}>
                  <Upload
                    className="avatar-uploader"
                    name="avatar"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    action="//jsonplaceholder.typicode.com/posts/"
                  >
                    {step.step_image
                      ? <img src={step.step_image} alt="" className="avatar" />
                      : <Icon
                          type="plus"
                          className="avatar-uploader-trigger"
                        />}
                  </Upload>
                </Col>
              </Row>
            </TabPane>
          )}
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipe,
    ingredients: state.ingredients,
    steps: state.steps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStepsIngr: (urls, urli) => dispatch(fetchStepsIngr(urls, urli)),
    clearRedux: () => dispatch(clearRedux())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails)
